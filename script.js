const mainCard = document.querySelector("#ContentWarpper");
const songImg = document.querySelector("#SongImg");
const controlButtons = document.querySelector(".control");
const currentYear = new Date().getFullYear();

const playPauseButton = document.querySelector("#PausePlay");
const audio = document.querySelector("audio");
const artist = document.querySelector("#Artist");
const songName = document.querySelector("#SongName");
const previousButton = document.querySelector("#Previous");
const nextButton = document.querySelector("#Next");
const songImgAtTheTop = document.querySelector("img");

let startDuration = document.querySelector("#Start");
const endDuration = document.querySelector("#End");
const meter = document.querySelector("#ProgrssMeterChild");
const progressBar = document.querySelector("#ProgressMeterContainer");

let isPlaying = false;
let index = 0;
let isShuffling = false; // New variable for shuffle functionality
let isLooping = false; // New variable for looping functionality


const songDataBase = [
  {
    songSrc: "./music/music1.mp3",
    title: "No More What Ifs - Persona 5 Royal",
    artist: "Lyn",
    imgSrc: "./img/music1.jpg",
  },
  {
    songSrc: "./music/music2.mp3",
    title: "Iwatodai Dorm - Persona 3",
    artist: "Shoji Meguro",
    imgSrc: "./img/music2.jpg",
  },
  {
    songSrc: "./music/music3.mp3",
    title: "Heartbeat, Heartbreak - Persona 4",
    artist: "Shoji Meguro",
    imgSrc: "./img/music3.jpg",
  },
  {
    songSrc: "./music/music4.mp3",
    title: "Throw Away Your Mask - Persona 5 Royal",
    artist: "Lyn",
    imgSrc: "./img/music4.jpg",
  },
  {
    songSrc: "./music/music5.mp3",
    title: "Time to Make History - Persona 5 Royal",
    artist: "Shoji Meguro",
    imgSrc: "./img/music5.jpg",
  },
  {
    songSrc: "./music/music6.mp3",
    title: "Last Surprise - Persona 5 Royal",
    artist: "Lyn",
    imgSrc: "./img/music6.jpg",
  },
  {
    songSrc: "./music/music7.mp3",
    title: "Gentle Madman - Persona 5 Royal",
    artist: "Shoji Meguro",
    imgSrc: "./img/music7.png",
  },
  {
    songSrc: "./music/music8.mp3",
    title: "Battle For Everyone's Souls - Persona 3 The Answer",
    artist: "Shoji Meguro",
    imgSrc: "./img/music8.png",
  },
  {
    songSrc: "./music/music9.mp3",
    title: "I'll Face Myself -Battle- - Persona 4 Reincarnation",
    artist: "Mix",
    imgSrc: "./img/music9.png",
  },
  {
    songSrc: "./music/music10.mp3",
    title: "Rivers in The Desert - Persona 5",
    artist: "Maher Zain",
    imgSrc: "./img/music10.jpg",
  },
  {
    songSrc: "./music/music11.mp3",
    title: "Never More - Persona 4 Reincarnation",
    artist: "Shoji Meguro & Shihoko Hirata",
    imgSrc: "./img/music11.webp",
  },
  {
    songSrc: "./music/music12.mp3",
    title: "Wiping All Out - Persona 3 Portable",
    artist: "Shoji Meguro & Mayumi Fujita",
    imgSrc: "./img/music12.jpeg",
  },
  {
    songSrc: "./music/music13.mp3",
    title: "A Lone Prayer - Shin Megami Tensei: Persona",
    artist: "Shoji Meguro & Yumi Kawamura",
    imgSrc: "./img/music13.jpg",
  },
  {
    songSrc: "./music/music14.mp3",
    title: "I Believe - Persona 5",
    artist: "Lyn",
    imgSrc: "./img/music14.webp",
  },
  {
    songSrc: "./music/music15.mp3",
    title: "Heaven - Persona 4",
    artist: "Shoji Meguro & Shihoko Hirata",
    imgSrc: "./img/music15.webp",
  },
  {
    songSrc: "./music/music16.mp3",
    title: "Specialist - Persona 4",
    artist: "Shoji Meguro",
    imgSrc: "./img/music16.avif",
  },
  {
    songSrc: "./music/music17.mp3",
    title: "Mass Destruction - Persona 3",
    artist: "Lotus Juice & Yumi Kawamura",
    imgSrc: "./img/music17.jpeg",
  },
  {
    songSrc: "./music/music18.mp3",
    title: "The Whims of Fate - Persona 5",
    artist: "Lyn",
    imgSrc: "./img/music18.webp",
  },
  {
    songSrc: "./music/music19.mp3",
    title: "Price - Persona 5",
    artist: "Shoji Meguro",
    imgSrc: "./img/music19.jpg",
  },
  {
    songSrc: "./music/music20.mp3",
    title: "Beneath the Mask - Persona 5",
    artist: "Lyn",
    imgSrc: "./img/music20.webp",
  },
];

const loadMusic = () => {
  audio.src = songDataBase[index].songSrc;
  artist.textContent = songDataBase[index].artist;
  songName.textContent = songDataBase[index].title;
  songImgAtTheTop.src = songDataBase[index].imgSrc;
};
audio.addEventListener("ended", () => {
  loadMusic(index++);
  play();
});
// Function to shuffle the songs
const shuffleSongs = () => {
  let shuffledIndex = Math.floor(Math.random() * songDataBase.length);
  // Make sure the shuffled index is different from the current index
  while (shuffledIndex === index) {
    shuffledIndex = Math.floor(Math.random() * songDataBase.length);
  }
  index = shuffledIndex;
  loadMusic();
  play();
};

// Function to toggle shuffle mode
const toggleShuffle = () => {
  isShuffling = !isShuffling;
  if (isShuffling) {
    // If shuffle is enabled, shuffle the songs and update button style
    shuffleSongs();
    nextButton.classList.add("shuffle");
  } else {
    // If shuffle is disabled, remove shuffle style
    nextButton.classList.remove("shuffle");
  }
};

// Function to toggle loop mode
const toggleLoop = () => {
  isLooping = !isLooping;
  audio.loop = isLooping; // Set the loop property of the audio element
  if (isLooping) {
    // If loop is enabled, update button style
    nextButton.classList.add("loop");
  } else {
    // If loop is disabled, remove loop style
    nextButton.classList.remove("loop");
  }
};

// Event listener for shuffle button click
document.querySelector("#Shuffle").addEventListener("click", toggleShuffle);

// Event listener for loop button click
document.querySelector("#Loop").addEventListener("click", toggleLoop);

audio.addEventListener("ended", () => {
  if (isShuffling) {
    // If shuffle is enabled, shuffle the songs
    shuffleSongs();
  } else if (isLooping) {
    // If loop is enabled, play the same song again
    play();
  } else {
    // Otherwise, play the next song in the list
    loadMusic(index++);
    play();
  }
});

loadMusic();

nextButton.addEventListener("click", () => {
  if (index < songDataBase.length - 1) {
    loadMusic(index++);
    play();
  } else {
    pause();
  }
});
nextButton.addEventListener("click", () => {
  if (isShuffling) {
    // If shuffle is enabled, shuffle the songs
    shuffleSongs();
  } else if (isLooping) {
    // If loop is enabled, play the same song again
    play();
  } else if (index < songDataBase.length - 1) {
    // Otherwise, play the next song in the list
    loadMusic(index++);
    play();
  } else {
    // If at the end of the list, pause or loop based on loop mode
    isLooping ? play() : pause();
  }
});
previousButton.addEventListener("click", () => {
  if (index > 0) {
    loadMusic(index--);
    play();
  } else {
    pause();
  }
});

const play = () => {
  isPlaying = true;
  audio.play();
  playPauseButton.classList.replace("fa-play", "fa-pause");
  songImg.classList.add("anime");
};
const pause = () => {
  isPlaying = false;
  audio.pause();
  playPauseButton.classList.replace("fa-pause", "fa-play");
  songImg.classList.remove("anime");
};

playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});
let minute, second;
const timeStamp = (event) => {
  let { duration, currentTime } = event.srcElement;
  const full_second = Math.floor(duration % 60);
  const full_minute = Math.floor(duration / 60);
  const start_second = Math.floor(currentTime % 60);
  const start_minute = Math.floor(currentTime / 60);
  const totalDuration = `${full_minute} : ${full_second}`;
  const currenDuration = `${start_minute} : ${start_second}`;
  if (duration) {
    endDuration.textContent = totalDuration;
  }
  startDuration.textContent = currenDuration;
  const percentage = (currentTime / duration) * 100;
  meter.style.width = `${percentage}%`;
};
audio.addEventListener("timeupdate", timeStamp);
progressBar.addEventListener("click", (event) => {
  const { duration } = audio;
  const moreProgress =
    (event.offsetX / event.srcElement.clientWidth) * duration;
  audio.currentTime = moreProgress;
});

document.querySelector("#Year").innerHTML = currentYear;

mainCard.addEventListener("mouseover", (event) => {
  const xAxis = (window.innerWidth / 2 - event.pageX) / 15;
  const yAxis = (window.innerHeight / 2 - event.pageY) / 15;
  mainCard.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
  songImg.style.transform = `rotate(${xAxis}deg)`;
  controlButtons.style.transform = `rotate(${xAxis}deg)`;
});
mainCard.addEventListener("mouseleave", () => {
  mainCard.style.transform = "rotateX(0deg) rotateY(0deg)";
  songImg.style.transform = "rotate(0deg)";
  controlButtons.style.transform = "rotate(0deg)";
});
