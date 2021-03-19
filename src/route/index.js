import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Intro,
  Login,
  ResetPassword,
  Splashscreen,
  HomeCashier,
  HomeStaff,
  // ==Staff==
  DataBarang,
  KategoriBarang,
  DataTanggalBeli,
  DataTanggalBarang,
  InputDataBarang,
  InputPembelian,
  UpdateKategori,
  UpdateTanggalBarang,
  // ==Cashier==
  DataBarangKasir,
  KategoriBarangKasir,
  RegisterMember,
  Scan,
  Struk,
  TotalStruk,
  UpdateStruk,
  AbsenKasir,
  // ==Pimpinan==
  HomePimpinan,
  ListBulan,
  ListHari,
  ListBulanHari,
  ListBulanBeli,
  ListBulanJual,
  ListBulanStok,
  LaporanBulanan,
  LaporanPembelian,
  LaporanPenjualan,
  LaporanDetailPenjualan,
  LaporanHarian,
  LaporanStok,
  LaporanPengeluaran,
  UpdatePengeluaran,
  Fusion,
  IndukSupplier,
  UpdateSupplier,
  Supplier,
  IndukKategori,
  UpdateKategoriProduk,
  ListBulanAbsen,
  LaporanAbsenKasir,
  Absen,
} from './routes';

const Stack = createStackNavigator();

const Lobby = () => {
  return (
    <Stack.Navigator headerMode="false">
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

const Cashier = () => {
  return (
    <Stack.Navigator headerMode="false">
      <Stack.Screen name="HomeCashier" component={HomeCashier} />
      <Stack.Screen name="DataBarangKasir" component={DataBarangKasir} />
      <Stack.Screen
        name="KategoriBarangKasir"
        component={KategoriBarangKasir}
      />
      <Stack.Screen name="RegisterMember" component={RegisterMember} />
      <Stack.Screen name="Scan" component={Scan} />
      <Stack.Screen name="Struk" component={Struk} />
      <Stack.Screen name="TotalStruk" component={TotalStruk} />
      <Stack.Screen name="UpdateStruk" component={UpdateStruk} />
      <Stack.Screen name="AbsenKasir" component={AbsenKasir} />
    </Stack.Navigator>
  );
};

const Staff = () => {
  return (
    <Stack.Navigator headerMode="false">
      <Stack.Screen name="HomeStaff" component={HomeStaff} />
      <Stack.Screen name="DataBarang" component={DataBarang} />
      <Stack.Screen name="KategoriBarang" component={KategoriBarang} />
      <Stack.Screen name="DataTanggalBeli" component={DataTanggalBeli} />
      <Stack.Screen name="DataTanggalBarang" component={DataTanggalBarang} />
      <Stack.Screen name="InputDataBarang" component={InputDataBarang} />
      <Stack.Screen name="InputPembelian" component={InputPembelian} />
      <Stack.Screen name="UpdateKategori" component={UpdateKategori} />
      <Stack.Screen
        name="UpdateTanggalBarang"
        component={UpdateTanggalBarang}
      />
    </Stack.Navigator>
  );
};

const Pimpinan = () => {
  return (
    <Stack.Navigator headerMode="false">
      <Stack.Screen name="HomePimpinan" component={HomePimpinan} />
      <Stack.Screen name="ListBulan" component={ListBulan} />
      <Stack.Screen name="ListHari" component={ListHari} />
      <Stack.Screen name="ListBulanHari" component={ListBulanHari} />
      <Stack.Screen name="ListBulanBeli" component={ListBulanBeli} />
      <Stack.Screen name="ListBulanJual" component={ListBulanJual} />
      <Stack.Screen name="ListBulanStok" component={ListBulanStok} />
      <Stack.Screen name="LaporanBulanan" component={LaporanBulanan} />
      <Stack.Screen name="LaporanHarian" component={LaporanHarian} />
      <Stack.Screen name="LaporanPembelian" component={LaporanPembelian} />
      <Stack.Screen name="LaporanPenjualan" component={LaporanPenjualan} />
      <Stack.Screen name="LaporanStok" component={LaporanStok} />
      <Stack.Screen
        name="LaporanDetailPenjualan"
        component={LaporanDetailPenjualan}
      />
      <Stack.Screen name="Fusion" component={Fusion} />
      <Stack.Screen name="LaporanPengeluaran" component={LaporanPengeluaran} />
      <Stack.Screen name="UpdatePengeluaran" component={UpdatePengeluaran} />
      <Stack.Screen name="IndukSupplier" component={IndukSupplier} />
      <Stack.Screen name="Supplier" component={Supplier} />
      <Stack.Screen name="UpdateSupplier" component={UpdateSupplier} />
      <Stack.Screen name="IndukKategori" component={IndukKategori} />
      <Stack.Screen
        name="UpdateKategoriProduk"
        component={UpdateKategoriProduk}
      />
      <Stack.Screen name="ListBulanAbsen" component={ListBulanAbsen} />
      <Stack.Screen name="LaporanAbsenKasir" component={LaporanAbsenKasir} />
      <Stack.Screen name="Absen" component={Absen} />
    </Stack.Navigator>
  );
};

export default class appstack extends Component {
  render() {
    return (
      <Stack.Navigator headerMode="false">
        <Stack.Screen name="Splashscreen" component={Splashscreen} />
        <Stack.Screen name="Lobby" component={Lobby} />
        <Stack.Screen name="Cashier" component={Cashier} />
        <Stack.Screen name="Staff" component={Staff} />
        <Stack.Screen name="Pimpinan" component={Pimpinan} />
      </Stack.Navigator>
    );
  }
}
