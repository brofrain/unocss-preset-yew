use yew::prelude::*;
use yew_unocss_transformer::uno;

#[function_component(App)]
pub fn app() -> Html {
    html! {
        <div id="app">
            <input
                class={
                    uno!(
                        "w72", // some comment
                        "p-(x5 y.5)",
                        "text-(center red)    some-fake-class   ",
                        "fw700",
                        "bg-green"    , // some whitespaces
                        "rounded"     ,
                        "border-(1 blue/30)",

                        // some gap

                        "placeholder:(italic text-sm text-secondary/75)",

                                "outline-(~ 2 offset-0 transparent)",

        "hover:outline-yellow !focus:outline-orange",

                        "transition-all",
                    )
                }
            />

            <input
                class={
                    uno!(
                        "w72",
                        "text-(center red)" // no semicolon
                }
            />

            <input class={ uno!("w72", "text-(center red)") } /> // one-liner
            <input class={ uno!("w72", "text-(center red)",) } /> // one-liner with semicolon
            <input class={ uno!("text-(center red)") } /> // lone wolf
        </div>
    }
}
