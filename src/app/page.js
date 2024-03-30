import ObjectDetection from "@/components/object-detection";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center flex-col p-8 bg-black">
      <h1 className="gradient-title font-extrabold text-3xl md:text-6xl lg:text-8xl tracking-tighter md:px-6 text-center">
        Object Detection App
      </h1>
      <ObjectDetection />
    </main>
  );
}
