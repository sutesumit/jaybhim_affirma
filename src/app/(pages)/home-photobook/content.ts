export const videoSources = {
  background: "https://www.youtube.com/embed/llARFMPOTB0?start=1137&autoplay=1&mute=1&controls=0&loop=1&playlist=llARFMPOTB0&modestbranding=1&showinfo=0&rel=0",
  gallery: "https://www.youtube.com/embed/INBzyeMpWzo?autoplay=1&mute=1&controls=0&loop=1&playlist=INBzyeMpWzo&modestbranding=1&showinfo=0&version=3&playlist=INBzyeMpWzo&rel=0",
  galleryDuration: 118
}

export interface TimelineItem {
  timestamp: number;
  label: string;
}

export const timelineItems: TimelineItem[] = [
  { timestamp: 0, label: "Start" },
  { timestamp: 10, label: "Opening" },
  { timestamp: 30, label: "Scene 1" },
  { timestamp: 60, label: "Scene 2" },
  { timestamp: 90, label: "Scene 3" },
  { timestamp: 118, label: "End" },
]
