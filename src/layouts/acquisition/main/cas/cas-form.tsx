import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp } from "lucide-react";

const schema = yup.object().shape({
  fullName: yup.string().required("Nama lengkap wajib diisi"),
  nik: yup.string().length(16, "NIK harus 16 digit").required("NIK wajib diisi"),
  birthDate: yup.date().required("Tanggal lahir wajib diisi"),
  spouseName: yup.string().optional(),
  spouseNik: yup.string().length(16, "NIK harus 16 digit").optional(),
  monthlyIncome: yup.number().required("Penghasilan wajib diisi"),
  houseOwnership: yup.string().required("Status kepemilikan rumah wajib diisi"),
  previousLoan: yup.boolean().required("Wajib dipilih"),
});

export default function CasForm() {
  const [openSections, setOpenSections] = useState({
    pemohon: true,
    pasangan: false,
    penghasilan: false,
    kepemilikan: false,
    repeatOrders: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Data Pemohon */}
      <Card>
        <CardHeader onClick={() => toggleSection("pemohon")} className="cursor-pointer">
         <div className="flex flex-row justify-between">
            <CardTitle>Data Pemohon</CardTitle>
            {openSections.pemohon ? <ChevronUp /> : <ChevronDown />}
         </div>
        </CardHeader>
        {openSections.pemohon && (
          <CardContent className="space-y-3">
            <Label>Nama Lengkap</Label>
            <Input {...register("fullName")} placeholder="Masukkan Nama" />
            {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}

            <Label>NIK</Label>
            <Input {...register("nik")} placeholder="Masukkan NIK" />
            {errors.nik && <p className="text-red-500">{errors.nik.message}</p>}
          </CardContent>
        )}
      </Card>

      {/* Data Pasangan */}
      <Card>
        <CardHeader onClick={() => toggleSection("pasangan")} className="cursor-pointer flex justify-between items-center">
          <CardTitle>Data Pasangan</CardTitle>
          {openSections.pasangan ? <ChevronUp /> : <ChevronDown />}
        </CardHeader>
        {openSections.pasangan && (
          <CardContent className="space-y-3">
            <Label>Nama Pasangan</Label>
            <Input {...register("spouseName")} placeholder="Masukkan Nama Pasangan" />
            <Label>NIK Pasangan</Label>
            <Input {...register("spouseNik")} placeholder="Masukkan NIK Pasangan" />
          </CardContent>
        )}
      </Card>

      {/* Data Penghasilan */}
      <Card>
        <CardHeader onClick={() => toggleSection("penghasilan")} className="cursor-pointer flex justify-between items-center">
          <CardTitle>Data Penghasilan</CardTitle>
          {openSections.penghasilan ? <ChevronUp /> : <ChevronDown />}
        </CardHeader>
        {openSections.penghasilan && (
          <CardContent>
            <Label>Penghasilan Bulanan</Label>
            <Input type="number" {...register("monthlyIncome")} placeholder="Masukkan Penghasilan" />
            {errors.monthlyIncome && <p className="text-red-500">{errors.monthlyIncome.message}</p>}
          </CardContent>
        )}
      </Card>

      {/* Data Kepemilikan */}
      <Card>
        <CardHeader onClick={() => toggleSection("kepemilikan")} className="cursor-pointer flex justify-between items-center">
          <CardTitle>Data Kepemilikan</CardTitle>
          {openSections.kepemilikan ? <ChevronUp /> : <ChevronDown />}
        </CardHeader>
        {openSections.kepemilikan && (
          <CardContent>
            <Label>Status Kepemilikan Rumah</Label>
            <Input {...register("houseOwnership")} placeholder="Masukkan Status Kepemilikan" />
            {errors.houseOwnership && <p className="text-red-500">{errors.houseOwnership.message}</p>}
          </CardContent>
        )}
      </Card>

      {/* Data Repeat Orders */}
      <Card>
        <CardHeader onClick={() => toggleSection("repeatOrders")} className="cursor-pointer flex justify-between items-center">
          <CardTitle>Data Repeat Orders</CardTitle>
          {openSections.repeatOrders ? <ChevronUp /> : <ChevronDown />}
        </CardHeader>
        {openSections.repeatOrders && (
          <CardContent>
            <Label>Pernah Mengajukan Kredit Sebelumnya?</Label>
            <select {...register("previousLoan")} className="border rounded p-2 w-full">
              <option value="true">Ya</option>
              <option value="false">Tidak</option>
            </select>
            {errors.previousLoan && <p className="text-red-500">{errors.previousLoan.message}</p>}
          </CardContent>
        )}
      </Card>

      <Button type="submit" className="w-full">Submit</Button>
    </form>
  );
}
