alert('Hello World');
const example = () => {
  const fromInput = document.getElementById('textInput').value;
  document.getElementById('log').innerText = fromInput;
};
document.getElementById('btn').addEventListener('click', example);
