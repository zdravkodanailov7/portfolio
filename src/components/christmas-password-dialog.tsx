"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { INITIAL_PASSWORD, MASTER_PASSWORD } from "@/lib/christmas-constants";

interface ChristmasPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChristmasPasswordDialog({
  open,
  onOpenChange,
}: ChristmasPasswordDialogProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedPassword = password.toLowerCase().trim();

    if (
      normalizedPassword === INITIAL_PASSWORD ||
      normalizedPassword === MASTER_PASSWORD
    ) {
      setError("");
      setPassword("");
      onOpenChange(false);
      router.push("/christmas-mission");
    } else {
      setError("Access Denied! Try again.");
      setPassword("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>🎄 Christmas Mission Access 🎄</DialogTitle>
          <DialogDescription>
            Enter the password to access the mission. Hint: It&apos;s today...
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter password..."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-destructive">{error}</p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                setPassword("");
                setError("");
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Enter</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

