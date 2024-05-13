import { viaCepAxios } from "@/lib/axios/viacep";
import { ViaCEPValidator, viaCepSchema } from "@/utils/validators/ViaCEP";

export async function fetchCEP(
  cep: string | undefined,
): Promise<ViaCEPValidator> {
  if (!cep) throw new Error();
  const cep_numeros = cep.replace(/[^0-9]/g, "");

  const { data } = await viaCepAxios.get<ViaCEPValidator>(
    `${cep_numeros}/json`,
  );

  if (viaCepSchema.safeParse(data).success) {
    return data;
  } else {
    console.warn("[Data] => ", data);
    console.warn("[Error] => ", viaCepSchema.safeParse(data));
    throw new Error();
  }
}
