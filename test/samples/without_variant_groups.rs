use yew::prelude::*;

#[function_component(App)]
pub fn app() -> Html {
    html! {
        <div id="app">
            <input
                class={
                    classes!(
                        "w72", // some comment
                        "px5",
                        "py.5",
                        "text-center    some-fake-class   ",
                        "text-red",
                        "fw700",
                        "bg-green"      , // some whitespaces
                        "rounded"       ,
                        "border-1",
                        "border-blue/30",

                        // some gap

                        "placeholder:italic",

                        // real chads need no formatters
                "placeholder:text-sm",
                                "placeholder:text-secondary/75",
                "outline",
                                "outline-2",

                            "outline-offset-0",
                        "outline-transparent",
                    "hover:outline-yellow",
                "!focus:outline-orange",
            "transition-all"
                    )
                }
            />

            <input
                class={
                    classes!(
                        "w72",
                        "px5" // no semicolon
                }
            />

            <input class={ classes!("w72", "px5") } /> // one-liner
            <input class={ classes!("w72", "px5",) } /> // one-liner with semicolon
            <input class={ classes!("px5") } /> // lone wolf
        </div>
    }
}
