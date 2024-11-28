import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { NavigationFormData } from "@/types/navigation";
import { TrashIcon } from "@/components/Icons";

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
  onClose: () => void;
}

export default function NavigationForm({
  initialData,
  onSubmit,
  onClose,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NavigationFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  return (
    <div className="bg-white border border-[#D0D5DD] rounded-md p-6 relative">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
      >
        <TrashIcon className="hover:text-red-500 transition-colors" />
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[95%]">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            {...register("label")}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="e.g., Promotions"
          />
          {errors.label && (
            <span className="text-red-500 text-sm">{errors.label.message}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">URL</label>
          <input
            {...register("url")}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Paste or search"
          />
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
