import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { NavigationFormData } from "@/types/navigation";

const schema: z.ZodSchema<NavigationFormData> = z.lazy(() =>
  z.object({
    label: z.string().min(1, "Name is required"),
    url: z.string().optional(),
    children: z.array(schema).optional(),
  }),
);

interface Props {
  initialData?: NavigationFormData;
  onSubmit: (data: NavigationFormData) => void;
}

export default function NavigationForm({ initialData, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NavigationFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          {...register("label")}
          className="w-full p-2 border rounded"
          placeholder="Enter name"
        />
        {errors.label && (
          <span className="text-red-500 text-sm">{errors.label.message}</span>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">URL</label>
        <input
          {...register("url")}
          className="w-full p-2 border rounded"
          placeholder="Enter URL (optional)"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save
      </button>
    </form>
  );
}
