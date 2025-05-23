import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET (){

    const { data : session, error } = await supabase.auth.getSession()

    if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, session }, { status: 200 })

}