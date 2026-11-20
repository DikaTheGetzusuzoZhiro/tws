import { NextResponse } from "next/server";

export async function GET(_request: Request, { params }: { params: { username: string } }) {
  const username = decodeURIComponent(params.username || "").trim();
  if (!username || username.length > 20) {
    return NextResponse.json({ error: "Username tidak valid." }, { status: 400 });
  }
  try {
    const lookup = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernames: [username], excludeBannedUsers: true }),
      cache: "no-store"
    });
    if (!lookup.ok) throw new Error("Roblox user lookup failed");
    const result = await lookup.json();
    const user = result.data?.[0];
    if (!user) return NextResponse.json({ error: "Username Roblox tidak ditemukan." }, { status: 404 });
    const thumbs = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${user.id}&size=150x150&format=Png&isCircular=false`,
      { cache: "no-store" }
    );
    const thumbData = thumbs.ok ? await thumbs.json() : null;
    return NextResponse.json({
      id: user.id,
      name: user.name,
      displayName: user.displayName,
      avatar: thumbData?.data?.[0]?.imageUrl || null
    });
  } catch {
    return NextResponse.json({ error: "Tidak dapat memeriksa username saat ini. Coba lagi." }, { status: 502 });
  }
}
