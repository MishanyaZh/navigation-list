import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { NavigationFormData } from "@/types/navigation";
import { TrashIcon, SearchIcon } from "@/components/Icons";

const schema: z.ZodSchema<NavigationFormData> = z.lazy(() =>
  z.object({
    label: z.string().min(1, "Nazwa jest wymagana"),
    url: z
      .string()
      .transform((str) => str.trim())
      .refine(
        (val) => {
          if (!val) return true;
          try {
            new URL(val);
            return true;
          } catch {
            return false;
          }
        },
        { message: "Nieprawidłowy format URL" },
      ),
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
    mode: "onChange",
  });

  return (
    <div className="bg-white border border-[#D0D5DD] rounded-md p-6 mx-6 my-4 relative">
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
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-[0px_1px_2px_0px_#1018280D]"
            placeholder="np. Promocje"
          />
          {errors.label && (
            <span className="text-red-500 text-sm">{errors.label.message}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Link</label>
          <div className="relative">
            <input
              {...register("url")}
              className={`w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-[0px_1px_2px_0px_#1018280D] ${
                errors.url ? "border-red-500" : ""
              }`}
              placeholder="Wklej lub wyszukaj np. https://example.com"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          {errors.url && (
            <span className="text-red-500 text-sm">{errors.url.message}</span>
          )}
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-[#D0D5DD] rounded-md text-gray-700 hover:bg-gray-200 shadow-[0px_1px_2px_0px_#1018280D]"
          >
            Anuluj
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-[#D0D5DD] rounded-md text-purple-700 hover:bg-gray-200 shadow-[0px_1px_2px_0px_#1018280D]"
          >
            Dodaj
          </button>
        </div>
      </form>
    </div>
  );
}
