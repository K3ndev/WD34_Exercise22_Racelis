import "./style.css";
import { icons } from "./components/icons.js";

function renderInDom() {
  document.querySelector("#app").innerHTML = `
  <main>
    <section class='mt-16 w-fit mx-auto'>
      <h1 class='text-3xl text-rose-900 mb-10 text-center'>Rock-Paper-Scissor Game</h1>

      <div class='flex justify-between gap-8'>
        <div class='flex justify-around gap-4' style='width: 100%'>
          <div class='relative w-1/2 flex justify-center items-center border shadow-md
            ${isGameStart ? "border-rose-600 " : "border-rose-100"} 
            '>
            ${icons({ icon: botChosenWeapon, toLeft: true })}
            <p class='absolute bottom-0 inset-x-0 text-center'>Bot</p>
          </div>
          <div class='relative w-1/2 flex justify-center items-center border shadow-md
          ${isGameStart ? "border-rose-600 " : "border-rose-100"} 
          '>
            ${icons({ icon: humanChosenWeapon, toRight: true })}
            <p class='absolute bottom-0 inset-x-0 text-center'>Human</p>
          </div>
        </div>

        <div class='flex flex-col gap-2'>
          <button 
            onclick="button(this)"
            data-value='rock'
            ${isGameStart ? "" : "disabled = 'false'"}
            class='border w-fit p-2 
              ${
                isGameStart
                  ? "border-rose-600 hover:scale-110 hover:border-rose-900 hover:shadow-lg"
                  : "border-rose-300"
              }
            bg-rose-200 shadow-md'>
            ${icons({ icon: "rock" })}
          </button>
          <button id='toggleButton' 
            onclick="button(this)"
            data-value='scissor'
            ${isGameStart ? "" : "disabled = 'false'"}
            class='
              border w-fit p-2 
              ${
                isGameStart
                  ? "border-rose-600 hover:scale-110 hover:border-rose-900 hover:shadow-lg"
                  : "border-rose-300"
              }
            bg-rose-200 shadow-md'
            >
              ${icons({ icon: "scissor" })}
          </button>
          <button 
            onclick="button(this)"
            data-value='paper'
            ${isGameStart ? "" : "disabled = 'false'"}
            class='border w-fit p-2 
              ${
                isGameStart
                  ? "border-rose-600 hover:scale-110 hover:border-rose-900 hover:shadow-lg"
                  : "border-rose-300"
              }
            bg-rose-200 shadow-md '>
            ${icons({ icon: "paper" })}
          </button>
        </div>
      </div>
      
      
    </section>
    
    <section>
    <div class='mt-12 w-full text-center'>
        <p class='text-sm'><span class=' ${
          isGameStart ? "text-rose-600" : "text-rose-400"
        }'>status:</span> ${isGameStart ? "Pick one!" : "Wait!"} </p>
    </div>
    <div class='border border-rose-400 p-4 max-w-lg mx-auto'>
        ${recordData
          .map((item) => {
            return `<p class='text-sm text-gray-500'>match result:: <span class='text-rose-600'>bot</span>:${item.bot} |vS| <span class='text-rose-600'>human</span>:${item.human} -> <span class='text-rose-600'>result</span>:${item.result}</p>`;
          })
          .join("")}
    </div>
    </section>

  </main>
`;
}

// watcher
setInterval(() => {
  if (watcherRerender) {
    console.log("watcher run, re-render DOM");
    console.log("-- -- -- ");
    renderInDom();
    watcherRerender = false;
  }
}, 1000);

// if (watcherRerender) {
//   console.log("watcher run, re-render DOM");
//   console.log("-- -- -- ");
//   renderInDom();
//   watcherRerender = false;
// }

// todo [checked] 1. use javascript only when rendering an element to dom
// todo [checked] 2. DRY
// todo [checked] 3. rendering and logic should not in one file
// todo [checked] 4. create a scoreboard

// things that i learned
// 1. using this instead of event is good, because its absolute
// 2. creating a watcher function that when a variable is changed the watcher function will do something
//   - I don't know how to create a global variable with module, so lets use the normal weird behavior
// 3. <script src='./foo.js'></script> the variable that you created inside of './foo.js' is global, you can access using browser

// suggestion
// instead of using setInterval use this https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver ???

// explanation the behavior of your site
// 1. explain the effect of this code <script src='./foo.js'></script>
// 2. lifecycle, if there's something change in the our global variable then re-render it again
