import { createGenerator, presetWind, type UnoGenerator } from 'unocss'

import { presetYew } from 'src'

describe('index', () => {
  const fakeGenerator = {
    generate: (classes: Set<string>) => ({ css: classes }),
  }

  it('should retrieve correct classes without variant group feature', async () => {
    const preset = presetYew({
      include: 'test/samples/without_variant_groups.rs',
    })

    expect(
      // @ts-expect-error I know what I'm doing
      await preset.preflights[0].getCSS({ generator: fakeGenerator })
    ).toMatchSnapshot()
  })

  it('should retrieve correct classes with variant group feature', async () => {
    const preset = presetYew({
      include: 'test/samples/with_variant_groups.rs',
    })

    expect(
      // @ts-expect-error I know what I'm doing
      await preset.preflights[0].getCSS({ generator: fakeGenerator })
    ).toMatchSnapshot()
  })

  it('should generate utils without variant group feature', async () => {
    const uno: UnoGenerator = createGenerator({
      presets: [
        presetWind(),
        presetYew({ include: 'test/samples/without_variant_groups.rs' }),
      ],
    })

    const { css } = await uno.generate('')
    expect(css).matchSnapshot()
  })

  it('should generate utils with variant group feature', async () => {
    const uno: UnoGenerator = createGenerator({
      presets: [
        presetWind(),
        presetYew({ include: 'test/samples/with_variant_groups.rs' }),
      ],
    })

    const { css } = await uno.generate('')
    expect(css).matchSnapshot()
  })
})
