function mergeFiles(fileParts) {
  return new Promise((resolve, reject) => {
    let buffers = [];

    function fetchPart(index) {
      if (index >= fileParts.length) {
        let mergedBlob = new Blob(buffers);
        let mergedFileUrl = URL.createObjectURL(mergedBlob);
        resolve(mergedFileUrl);
        return;
      }
      fetch(fileParts[index])
        .then((response) => response.arrayBuffer())
        .then((data) => {
          buffers.push(data);
          fetchPart(index + 1);
        })
        .catch(reject);
    }
    fetchPart(0);
  });
}
function getParts(file, start, end) {
    let parts = [];
    for (let i = start; i <= end; i++) {
        parts.push(file + ".part" + i);
    }
    return parts;
}
  