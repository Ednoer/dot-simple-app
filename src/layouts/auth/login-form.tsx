import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"
import api from "@/lib/axiosInstances";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

type FormData = yup.InferType<typeof schema>;

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post("/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }
      toast.success("Login sukses!");
      router.push("/tasks");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Login gagal");
    },
  });

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit((data) => mutation.mutate(data))} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Simple App 🚀</h1>
        <p className="text-balance text-sm">Masukkan email untuk login</p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" {...register("email")} />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </div>
      <div className="text-center text-xs text-muted-foreground [&_a]:underline hover:[&_a]:text-primary">
        Don't have an account? <a href="/auth/register">Register</a>
      </div>
    </form>
  );
}
