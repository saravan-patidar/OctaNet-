const videoContainer = document.querySelector(".video-container");

const api_key = "AIzaSyC3Lww_R8D2vBTMhDEj3V-8a9dn8eg0cTM";
let video_http = "https://www.googleapis.com/youtube/v3/videos?"
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key :api_key,
    part : 'snippet',
    chart:'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    // console.log(data.items[0]);
    data.items.forEach(item => {
        getChannelIcon(item);
    });
})
.catch((err)=>{
    console.log(err);
});

const getChannelIcon = (video_data)=>{
    fetch(channel_http + new URLSearchParams({
        key : api_key,
        part : 'snippet',
        id : video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data =>{
        //  console.log(data);
        //  console.log(data.items[0].snippet.thumbnails.default.url);
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCart(video_data);
    })
}

const makeVideoCart = (data)=>{
    videoContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
    <img src="${data.snippet.thumbnails.high.url}" class="thumbnails" alt="">
    <div class="content">
        <img src="${data.channelThumbnail}" class="channel-dp" alt="">
        <div class="info">
            <h4 class="title">${data.snippet.title}</h4>
            <p class="channel-name">${data.snippet.channelTitle}</p>
        </div>
    </div>
</div>`
}


//search bar 
const searchInput = document.querySelector(".search-bar");
const searchButtton = document.querySelector(".search-btn");

const searchLink = "https://www.youtube.com/results?search_query=";

searchButtton.addEventListener('click',(e)=>{
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})


// menu button

const button = document.querySelector(".toggle-btn");
const sidebar = document.querySelector(".sidebar");
const root = document.documentElement;

button.addEventListener('click',()=>{
    if(sidebar.style.display === "none"){
        sidebar.style.display= "block";
        root.style.setProperty('--lenght-sidebar','250px');
    }else{
        sidebar.style.display= "none";
        root.style.setProperty('--lenght-sidebar','0px');
    }
    
})