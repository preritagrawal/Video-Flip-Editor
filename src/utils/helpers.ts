function downloadJSON(filename, jsonData) {
     const element = document.createElement('a');
     element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(jsonData, null, 2)));
     element.setAttribute('download', filename);

     element.style.display = 'none';
     document.body.appendChild(element);

     element.click();

     document.body.removeChild(element);
}
const formatTime = (time: number) => {
     const minutes = Math.floor(time / 60);
     const seconds = Math.floor(time % 60);
     return `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
};
export { downloadJSON, formatTime };