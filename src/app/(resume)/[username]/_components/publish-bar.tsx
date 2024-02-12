"use client";

import { useEditProfile } from "@/hooks/use-editprofile";

export default function PublishBar() {
  const editProfile = useEditProfile();

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-center bg-secondary/25 p-2 backdrop-blur-lg">
      <button
        onClick={() => editProfile.open()}
        className="text-center text-sm tracking-tight"
      >
        Uw profiel is niet openbaar, bewerk hier uw profiel.
      </button>
    </div>
  );
}
