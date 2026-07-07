import { NextRequest, NextResponse } from "next/server";
import { getChatCompletion } from "@/lib/ai/openai";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Rate limiting: 20 messages per minute for authenticated users, 5 for guests
    const rateLimit = user ? 20 : 5;
    // TODO: Implement proper rate limiting with Upstash Redis

    const stream = await getChatCompletion({
      messages: messages.slice(-10), // Keep last 10 messages for context
      stream: true,
    }) as any;

    // Create streaming response
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new NextResponse(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("[AI Chat]", error);
    return NextResponse.json(
      { error: "Nyai Nyiur sedang istirahat sebentar. Coba lagi dalam beberapa saat." },
      { status: 500 }
    );
  }
}
