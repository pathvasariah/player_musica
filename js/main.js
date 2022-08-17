
const songs = [
    {title:'Fantaisie Impromptu', artist:'Chopin', src:'songs/Chopin, Fantaisie Impromptu (128 kbps).mp3', img:'img/Chopin.jpeg'},
    {title:'A Man Without Love', artist:'Engelbert Humperdinck', src:'songs/Engelbert Humperdinck - A Man Without Love (128 kbps).mp3', img:'img/Engelbert.jpg'},
    {title:'Odeon', artist:'Ernesto Nazareth', src:'songs/Ernesto Nazareth - Odeon (128 kbps).mp3', img:'img/Nazareth.jpg'},
    {title:'Trisch-Tratsch-Polka', artist:'Johann Strauss II', src:'songs/Tritsch-Tratsch-Polka - Johann Strauss II (128 kbps).mp3', img:'img/Johann_Strauss.jpg'}
];

const song = document.querySelector("audio");
let indexSong = 0;

const buttonPlay = document.querySelector(".button-play");
const buttonPause = document.querySelector(".button-pause");
const prevSong = document.querySelector('.prev');
const nextSong = document.querySelector('.next');
let endTime = document.querySelector('.end');
let image = document.querySelector('img');
let songName = document.querySelector('.description h2');
let artistName = document.querySelector('.description i');

renderSong(indexSong);

endTime.textContent = secondsToMinutes(Math.floor(song.duration));

//Eventos
buttonPlay.addEventListener('click', handlePlaySong);
buttonPause.addEventListener('click', handlePauseSong);
song.addEventListener('timeupdate', updateBar);
prevSong.addEventListener('click', () => {
    indexSong--;
    if(indexSong < 0){
        indexSong = 3;
    }
    renderSong(indexSong);
    handlePlaySong();
});
nextSong.addEventListener('click', () => {
    indexSong++;
    if(indexSong > 3){
        indexSong = 0;
    }
    renderSong(indexSong);
    handlePlaySong();
});

//Funções
function renderSong(index){
    song.setAttribute('src', songs[index].src);
    song.addEventListener('loadeddata', () =>{
        songName.textContent = songs[index].title;
        artistName.textContent = songs[index].artist;
        image.src = songs[index].img;
        endTime.textContent = secondsToMinutes(Math.floor(song.duration));
    });
}

function handlePlaySong(){
    song.play();
    buttonPause.style.display = 'block';
    buttonPlay.style.display = 'none';
}

function handlePauseSong(){
    song.pause();
    buttonPause.style.display = 'none';
    buttonPlay.style.display = 'block';
}

function updateBar(){
    let bar = document.querySelector('progress');
    bar.style.width = (song.currentTime/ song.duration) * 100 + '%';

    let timeStart = document.querySelector('.start');
    timeStart.textContent = secondsToMinutes(Math.floor(song.currentTime));
}

function secondsToMinutes(seconds){
   let inputMinutes = Math.floor(seconds / 60)
   let inputSeconds = seconds % 60;

   if(inputSeconds < 10){
        inputSeconds = '0' + inputSeconds;
   }
   return inputMinutes+':'+inputSeconds;
}