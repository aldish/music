const video = document.getElementById('video');
const canvas = document.getElementById('canvas'); // Elemen canvas
const captureButton = document.getElementById('captureButton'); // Tombol capture
const status = document.getElementById('status');
const playlistDiv = document.getElementById('playlist');

const playlistMap = {
  happy: [
    {
      title: "Melompat Lebih Tinggi",
      artist: "Sheila On 7",
      album: "07 Des",
      url: "https://music.youtube.com/watch?v=-e_VUdAXZXY&si=wC5yUepztBA6kRaB"
    },
    {
      title: "Kamulah Satu-satunya",
      artist: "Dewa 19",
      album: "Pandawa Lima",
      url: "https://music.youtube.com/watch?v=HjC43pC7CKo&si=fS4dDk99RtV7_iak"
    },
    {
      title: "Bebas",
      artist: "Iwa K",
      album: "Bebas",
      url: "https://music.youtube.com/watch?v=r-T9JrWL63E&si=xZXb9_y5VB3Vz18n"
    }
  ],
  sad: [
    {
      title: "Rumah ke Rumah",
      artist: "Hindia",
      album: "Menari Dengan Bayangan",
      url: "https://music.youtube.com/watch?v=xTQvdE1oOaw&si=g8lU1C9KuGPTqANf"
    },
    {
      title: "Sampai Jadi Debu",
      artist: "Banda Neira",
      album: "Yang Patah Tumbuh",
      url: "https://music.youtube.com/watch?v=6PMHUmM_hP0&si=4sb2nNFCIhMLkVgL"
    },
    {
      title: "Dan Hilang",
      artist: "Peterpan",
      album: "OST Alexandria",
      url: "https://music.youtube.com/watch?v=-tpaCR7N_Lk&si=nWrowS5gIyZF1X1F"
    }
  ],
  angry: [
    {
      title: "Bendera",
      artist: "Cokelat",
      album: "Cokelat Band",
      url: "https://music.youtube.com/watch?v=RRau7IhLM-g&si=mrjDqvB8p5gS4Re5"
    },
    {
      title: "Munafik",
      artist: "Ziva Magnolya",
      album: "Magnolya",
      url: "https://music.youtube.com/watch?v=LhcDZZULL7s&si=7zqhwHdwws9o1Rtw"
    },
    {
      title: "Posesif",
      artist: "Naif",
      album: "Jangan Terlalu",
      url: "https://music.youtube.com/watch?v=VLQS7bFQdlw&si=c-faAPjdsI-PTHiy"
    }
  ],
  neutral: [
    {
      title: "Bersamamu",
      artist: "Vierra",
      album: "My First Love",
      url: "https://music.youtube.com/watch?v=ASr0z2u8cAU&si=HCZF-jxZhQZ0VEcv"
    },
    {
      title: "Sephia",
      artist: "Sheila On 7",
      album: "Kisah Klasik",
      url: "https://music.youtube.com/watch?v=Y90xQ-bxkWU&si=bjpQov0HA-QrpLae"
    },
    {
      title: "Kangen",
      artist: "Dewa 19",
      album: "Format Masa Depan",
      url: "https://music.youtube.com/watch?v=YKK5_OQiEa4&si=YYmd1NOaub8BIPUU"
    }
  ],
  fearful: [
    {
      title: "Bertaut",
      artist: "Nadin Amizah",
      album: "Selamat Ulang Tahun",
      url: "https://music.youtube.com/watch?v=Xh93FL06JwQ&si=zquZsLyKb2uhtgxD"
    },
    {
      title: "Lathi",
      artist: "Weird Genius ft. Sara Fajira",
      album: "Lathi",
      url: "https://music.youtube.com/watch?v=UwTnUpDuwGg&si=nsmI7CL7T_nIqdu0"
    },
    {
      title: "Tanda",
      artist: "Yura Yunita",
      album: "Tanda",
      url: "https://music.youtube.com/watch?v=Q5NBd7CYCCY&si=bOmkBhIrpPFi5zXj"
    }
  ],
  disgusted: [
    {
      title: "Gagal Bersembunyi",
      artist: "The Rain",
      album: "Jabat Erat",
      url: "https://music.youtube.com/watch?v=1h7_0c0IxEs&si=GnwpPrltVvfpX5YM"
    },
    {
      title: "Resah",
      artist: "Payung Teduh",
      album: "Payung Teduh",
      url: "https://music.youtube.com/watch?v=jWq8hHCOJkg&si=uysvoeKjaD1m3aeE"
    },
    {
      title: "Desember",
      artist: "Efek Rumah Kaca",
      album: "Efek Rumah Kaca",
      url: "https://music.youtube.com/watch?v=qQGVwOTalJw&si=fErYs2YocrAQJaL7"
    }
  ],
  surprised: [
    {
      title: "Tiba-Tiba Cinta Datang",
      artist: "Maudy Ayunda",
      album: "Panggil Aku",
      url: "https://music.youtube.com/watch?v=fUPx7OWiXPc&si=-5jCShBOaKcGUva_"
    },
    {
      title: "Lagu Rindu",
      artist: "Kerispatih",
      album: "Kenangan yang Terindah",
      url: "https://music.youtube.com/watch?v=8vL0ZbPaX1g&si=bwtkU3kRAayvDuXS"
    },
    {
      title: "Selamat Ulang Tahun",
      artist: "Jamrud",
      album: "Sydney 090102",
      url: "https://music.youtube.com/watch?v=QJ80jTm4K8I&si=LiQ9h7jo0izVfYFs"
    }
  ]
};

function getThumbnailFileName(title) {
    return `assets/thumbs/${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')}.jpg`;
}  

// Fungsi start tidak banyak berubah, hanya memastikan model dimuat dan video dimulai.
async function start() {
    try {
        status.innerText = 'Memuat model...';
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]);
        
        status.innerText = 'Mengakses kamera...';
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        video.srcObject = stream;
        
        video.onloadedmetadata = () => {
            status.innerText = 'Kamera siap. Silakan ambil gambar.';
            captureButton.disabled = false; // Aktifkan tombol setelah kamera siap
        };

    } catch (err) {
        status.innerText = `Error: ${err.message}`;
        console.error(err);
    }
}

// ---- FUNGSI DETECT DIMODIFIKASI ----
// Sekarang menerima 'input' yang bisa berupa video atau canvas
async function detect(input) {
    const result = await faceapi
        .detectSingleFace(input, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

    if (!result) {
        status.innerText = '❌ Wajah tidak terdeteksi. Coba lagi.';
        playlistDiv.innerHTML = '';
        return;
    }

    const expressions = result.expressions;
    const emotion = Object.entries(expressions)
        .sort((a, b) => b[1] - a[1])[0][0];

    status.innerText = `😊 Ekspresi terdeteksi: ${emotion}`;

    const songList = playlistMap[emotion];
    if (!songList) {
        playlistDiv.innerHTML = `<p>⚠️ Belum ada lagu untuk ekspresi "${emotion}".</p>`;
        return;
    }

    const randomSongs = songList.sort(() => 0.5 - Math.random()).slice(0, 3);

    playlistDiv.innerHTML = randomSongs.map((song, idx) => {
        const thumbnail = getThumbnailFileName(song.title);
        return `
            <div class="song-card">
                <img src="${thumbnail}" alt="Thumbnail" class="song-thumb">  
                <div class="song-info">
                    <strong>${song.artist}</strong><br>
                    <small>${song.title}</small><br>
                    <small>${song.album}</small>
                </div>
                <a href="${song.url}" target="_blank" class="play-btn">
                    <i class="fas fa-play"></i>
                </a>
            </div>
        `;
    }).join('');
}


// ---- LOGIKA UTAMA: EVENT LISTENER UNTUK TOMBOL ----
captureButton.addEventListener('click', async () => {
    // 1. Dapatkan konteks 2D dari canvas
    const context = canvas.getContext('2d');
    
    // 2. Set ukuran canvas sama dengan ukuran video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // 3. Gambar frame video saat ini ke canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // 4. Tampilkan canvas dan sembunyikan video
    video.style.display = 'none';
    canvas.style.display = 'block';
    
    // 5. Hentikan stream video untuk "membekukan" kamera
    video.srcObject.getTracks().forEach(track => track.stop());
    
    // 6. Non-aktifkan tombol setelah mengambil gambar
    captureButton.disabled = true;
    status.innerText = 'Menganalisis ekspresi...';

    // 7. Panggil fungsi deteksi pada CANVAS
    await detect(canvas); 
});


// Panggil fungsi start untuk memulai semuanya
start();
captureButton.disabled = true; // Non-aktifkan tombol sampai kamera siap