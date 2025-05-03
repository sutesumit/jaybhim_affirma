import html2canvas from 'html2canvas'

const captureScreenshot = async (
    element: HTMLElement,
    filename: string = 'art.sumitsute.com-screenshot.png'
) => {
    try{
        // The screenshot will be saved as a canvas element
        const canvas = await html2canvas(element)
  
        // Convert the canvas to a data URL in PNG format
        // This data URL can be used to display the screenshot or save it as an image
        const dataURL = canvas.toDataURL('image/png')
        
        // Create a link element to download the screenshot
        const link = document.createElement('a')
  
        // Set the href attribute of the link to the data URL
        link.href = dataURL
  
        // Set the download attribute of the link to specify the filename for the downloaded image
        link.download = filename
  
        // Programmatically click the link to trigger the download
        // This simulates a click event on the link, causing the browser to download the image
        link.click()
  
      } catch (error) {
        console.error('Screenshot failed:', error)
      }
}

export default captureScreenshot
