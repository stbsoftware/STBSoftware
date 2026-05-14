
import EquipoSliderSection from "@/components/EquipoSliderSection";

export default function Equipo() {
	return (
		<main className="min-h-screen flex flex-col items-center bg-gray-50 pt-14 pb-12">
			<h1 className="text-3xl font-bold mb-8 text-brand-primary">Nuestro Equipo</h1>
			<EquipoSliderSection />
		</main>
	);
}