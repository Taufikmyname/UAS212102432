import { OnInit, AfterViewInit, Component } from '@angular/core';

declare const $: any;

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.component.html',
  styleUrls: ['./mahasiswa.component.css'],
})
export class MahasiswaComponent implements OnInit, AfterViewInit {
  data: any;
  table1: any;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.table1 = $('#table1').DataTable();
    this.bind_mahasiswa();
  }

  bind_mahasiswa(): void {
    this.http
      .get('https//stmikpontianak.net/011100862/tampilMahasiswa.php')
      .subscribe((data: any) => {
        console.log(data);

        this.table1.clear();

        data.forEach((element: any) => {
          var tempatTanggalLahir =
            element.TempatLahit + ', ' + element.TanggalLahir;

          var row = [
            element.NIM,
            element.Nama,
            element.JenisKelamin,
            tempatTanggalLahir,
            element.JP,
            element.Alamat,
            element.StatusNikah,
            element.TahunMasuk,
          ];
          this.table1.row.add(row);
        });

        this.table1.draw(false);
      });
  }
}
