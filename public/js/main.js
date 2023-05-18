function toggleNavbar(collapseID) {
  document.getElementById(collapseID).classList.toggle('hidden')
  document.getElementById(collapseID).classList.toggle('block')
}

function hitungJarakWaktuMingguan() {
  'use strict'
  const jamMinumAnda = document.getElementById('jamMinumAnda').value
  const berapakaliMinum = document.getElementById('berapakaliMinum').value

  // Memeriksa apakah input sudah diisi
  if (jamMinumAnda === '' || berapakaliMinum === '') {
    alert('Harap isi semua input!')
    return
  }

  // Mendapatkan jam dari input datetime-local
  const tglInput = new Date(jamMinumAnda)

  // Menghitung jumlah siklus dan jam minum selanjutnya
  const selisihJamMinum = Math.floor(24 / berapakaliMinum) // Selisih Jam Minum
  let jamSelanjutnya = tglInput.getHours() + selisihJamMinum // Jam Minum selanjutnya

  let jumlahTglSelanjutnya = 0
  if (jamSelanjutnya >= 24) {
    jumlahTglSelanjutnya = Math.floor(jamSelanjutnya / 24)
    jamSelanjutnya %= 24
  }

  let tglYgDiformat
  let hasil = ''

  for (let i = 0; i < 7; i++) {
    if (jumlahTglSelanjutnya !== 0) {
      const tglSelanjutnya = new Date(jamMinumAnda)
      tglSelanjutnya.setDate(tglInput.getDate() + jumlahTglSelanjutnya)

      // Mengonversi hasil ke dalam format yang mudah dibaca
      tglYgDiformat =
        tglSelanjutnya.getDate() +
        ' ' +
        tglSelanjutnya.toLocaleString('id-ID', { month: 'long' }) +
        ' ' +
        tglSelanjutnya.getFullYear()
    } else {
      // Mengonversi hasil ke dalam format yang mudah dibaca
      tglYgDiformat =
        tglInput.getDate() +
        ' ' +
        tglInput.toLocaleString('id-ID', { month: 'long' }) +
        ' ' +
        tglInput.getFullYear()
    }

    const menit = tglInput.getMinutes().toString().padStart(2, '0')
    const jam = jamSelanjutnya.toString().padStart(2, '0')

    hasil += `<p>Tgl:<b> ${tglYgDiformat}</b> Jam:<b> ${jam}:${menit}</b></p><br>`

    tglInput.setDate(tglInput.getDate() + jumlahTglSelanjutnya)
    jamSelanjutnya += selisihJamMinum
    if (jamSelanjutnya >= 24) {
      jumlahTglSelanjutnya = Math.floor(jamSelanjutnya / 24)
      jamSelanjutnya %= 24
    } else {
      jumlahTglSelanjutnya = 0
    }
  }

  // Menampilkan hasil pada elemen dengan id "hasil"
  const containerHasil = document.getElementById('containerHasil')
  containerHasil.classList.remove('hidden')
  const hasilContainer = document.getElementById('hasil')
  hasilContainer.innerHTML = `<h1 class="my-2 text-3xl">Jam Minum Selanjutnya di: </h1><div class="py-4 flex justify-center flex-col items-center"> ${hasil} </div>`
}
