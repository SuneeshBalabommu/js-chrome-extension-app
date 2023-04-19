let savedLinks = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn= document.getElementById("tab-btn");

const linksFromLocalStorage = JSON.parse( localStorage.getItem("savedLinks") )

if (linksFromLocalStorage) {
  savedLinks = linksFromLocalStorage
  render(savedLinks)
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({active:true, currentWindow: true},function(tabs){
    savedLinks.push(tabs[0].url)
    localStorage.setItem("savedLinks", JSON.stringify(savedLinks))
    render(savedLinks)
  })

})


function render(links) {
  let listItems = "";
  for (let i = 0; i < links.length; i++) {
    listItems += `
    <li>
        <a target='_blank' href='${links[i]}'>
            ${links[i]}
        </a>
    </li>`;
    // const li = document.createElement("li")
    // li.textContent = savedLinks[i]
    // ulEl.append(li)
  }
  ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear()
  savedLinks = []
  render(savedLinks)
})

inputBtn.addEventListener("click", function () {
  savedLinks.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("savedLinks",JSON.stringify(savedLinks))
  render(savedLinks);
});




