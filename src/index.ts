// eslint-disable-next-line unicorn/prefer-node-protocol
import fs from 'fs/promises'

import fg from 'fast-glob'
import MagicString from 'magic-string'
import { transformerVariantGroup, type Preset, extractorSplit } from 'unocss'

interface Options {
  /**
   * Glob for Rust files, so utilities can be extracted
   */
  include: string | string[]
}

const CLASS_UTIL_REG =
  /(?<=((classes|uno)!\(\s*(".*"\s*,\s*(\/\/[^\n]*)?\s*)*))"(.*?)"/g

const retrieveClasses = async ({ include }: Options): Promise<Set<string>> => {
  const transformer = transformerVariantGroup()
  const transform = (magicStr: MagicString) =>
    // @ts-expect-error the other params are not used anyway
    transformer.transform(magicStr)

  const filenames = Array.isArray(include)
    ? (await Promise.all(include.map((glob) => fg(glob)))).flat()
    : await fg(include)

  const classes = new Set<string>()

  for (const filename of filenames) {
    const data = await fs.readFile(filename, { encoding: 'utf8' })

    let potentialClasses: string | undefined = data
      .match(CLASS_UTIL_REG)
      ?.join(' ')

    if (!potentialClasses) {
      continue
    }

    const magicPotentialClasses = new MagicString(potentialClasses)
    await transform(magicPotentialClasses)
    if (magicPotentialClasses.hasChanged()) {
      potentialClasses = magicPotentialClasses.toString()
    }

    const extractedClasses = extractorSplit.extract({
      code: potentialClasses,
      original: potentialClasses,
    })

    if (!extractedClasses || 'then' in extractedClasses) {
      continue
    }

    for (const item of extractedClasses) {
      classes.add(item)
    }
  }

  return classes
}

const DEFAULT_OPTIONS: Options = { include: 'src/**/*.rs' }

export const presetYew = (options: Options = DEFAULT_OPTIONS): Preset<any> => ({
  name: 'yew',
  preflights: [
    {
      layer: 'default',
      getCSS: async ({ generator }) => {
        const classes = await retrieveClasses(options)
        const { css } = await generator.generate(classes, {
          preflights: false,
        })
        return css
      },
    },
  ],
})
