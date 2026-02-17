import html2canvas from 'html2canvas'

export const downloadElementScreenshot = async (
    element: HTMLElement,
    filename: 'art_sumitsute_com_your_tale'
): Promise<void> => {
    try {
        const canvas = await html2canvas(element)
        const dataUrl = canvas.toDataURL('image/png')
        triggerDownload(dataUrl, filename)
    } catch (error) {
        console.error('Error downloading screenshot:', error)
    }
}

export const getCanvasUrl = async (
    element: HTMLElement
): Promise<string | null> => {
    try {
        const canvas = await html2canvas(element, {
            useCORS: true,
            allowTaint: false,
            logging: false,
            scale: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
            backgroundColor: null,
        })
        return canvas.toDataURL('image/png')
    } catch (error){
        console.error('Error getting canvas url:', error)
        return null
    }
}


const triggerDownload = (dataUrl: string, filename: string) => {
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = filename
    link.click()
}
