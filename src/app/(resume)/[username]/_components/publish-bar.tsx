export default function PublishBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-center bg-secondary/50 p-2 backdrop-blur-lg">
      <div className="text-center text-sm tracking-tight">
        Your profile is not published. Publish it to share it with the world.
      </div>
    </div>
  );
}
