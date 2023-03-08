function copyTxt() {
  // Get the text field
  const copyText = document.querySelector('#target_text')
  const copyButton = document.querySelector('#copy-btn')
  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.innerText)

  // Alert the copied text
  alert('Copied the text: ' + copyText.innerText)
}
