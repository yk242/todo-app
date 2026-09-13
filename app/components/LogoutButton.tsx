'use client';

import { useRouter } from 'next/navigation';

import { LogOut } from 'lucide-react';

import { Button } from '@/app/components/ui/button';
import { createClient } from '@/lib/supabase/client';

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLogout}
      className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
    >
      <LogOut className="mr-2 h-4 w-4" />
      ログアウト
    </Button>
  );
}
