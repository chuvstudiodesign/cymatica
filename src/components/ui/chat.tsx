"use client";

import * as React from "react";
import { Paperclip, SendHorizontal } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Attachment,
  AttachmentContent,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Marker, MarkerContent } from "@/components/ui/marker";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

/**
 * Chat
 *
 * Não existe item `chat` no registry: o shadcn publica as peças
 * (bubble, message, message-scroller, attachment, marker) e deixa a
 * montagem por conta de quem usa. Este arquivo é essa montagem —
 * uma superfície de conversa pronta, ainda componível.
 */

export interface ChatAttachment {
  id: string;
  name: string;
}

export interface ChatMessage {
  id: string;
  /** Autor. "self" alinha à direita com a cor da marca. */
  author: string;
  self?: boolean;
  content: string;
  timestamp?: string;
  status?: string;
  attachments?: ChatAttachment[];
  /** Divisor exibido acima desta mensagem (data, não lidas…). */
  marker?: string;
}

export interface ChatProps {
  messages: ChatMessage[];
  onSend?: (text: string) => void;
  placeholder?: string;
  /** Rótulo acessível da região de conversa. */
  label?: string;
  disabled?: boolean;
  emptyMessage?: string;
  className?: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function Chat({
  messages,
  onSend,
  placeholder = "Escreva uma mensagem…",
  label = "Conversa",
  disabled,
  emptyMessage = "Nenhuma mensagem ainda.",
  className,
}: ChatProps) {
  const [draft, setDraft] = React.useState("");

  function send() {
    const text = draft.trim();
    if (!text) return;
    onSend?.(text);
    setDraft("");
  }

  return (
    <div
      className={cn(
        "flex h-[32rem] w-full flex-col overflow-hidden rounded-xl border bg-card",
        className,
      )}
    >
      <MessageScrollerProvider>
        <MessageScroller className="min-h-0 flex-1">
        <MessageScrollerViewport
          className="p-4"
          // A viewport precisa ser focável para rolar por teclado.
          tabIndex={0}
          role="log"
          aria-live="polite"
          aria-label={label}
        >
          <MessageScrollerContent className="flex flex-col gap-3">
            {messages.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </p>
            ) : (
              messages.map((m, i) => (
                <React.Fragment key={m.id}>
                  {m.marker ? (
                    <Marker variant="separator" className="my-2">
                      <MarkerContent>{m.marker}</MarkerContent>
                    </Marker>
                  ) : null}
                  <MessageScrollerItem
                    messageId={m.id}
                    scrollAnchor={i === messages.length - 1}
                  >
                    <Message align={m.self ? "end" : "start"}>
                      {m.self ? null : (
                        <MessageAvatar>
                          <Avatar size="sm">
                            <AvatarFallback>
                              {initials(m.author)}
                            </AvatarFallback>
                          </Avatar>
                        </MessageAvatar>
                      )}
                      <MessageContent>
                        <MessageHeader>{m.author}</MessageHeader>
                        <Bubble
                          align={m.self ? "end" : "start"}
                          variant={m.self ? "default" : "muted"}
                        >
                          <BubbleContent>{m.content}</BubbleContent>
                        </Bubble>
                        {m.attachments?.length ? (
                          <AttachmentGroup className="pt-1">
                            {m.attachments.map((a) => (
                              <Attachment key={a.id} size="sm">
                                <AttachmentMedia>
                                  <Paperclip />
                                </AttachmentMedia>
                                <AttachmentContent>
                                  <AttachmentTitle>{a.name}</AttachmentTitle>
                                </AttachmentContent>
                              </Attachment>
                            ))}
                          </AttachmentGroup>
                        ) : null}
                        {m.timestamp || m.status ? (
                          <MessageFooter>
                            {[m.timestamp, m.status]
                              .filter(Boolean)
                              .join(" · ")}
                          </MessageFooter>
                        ) : null}
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                </React.Fragment>
              ))
            )}
          </MessageScrollerContent>
        </MessageScrollerViewport>
          <MessageScrollerButton
            direction="end"
            aria-label="Ir para a mensagem mais recente"
          />
        </MessageScroller>
      </MessageScrollerProvider>

      <form
        className="flex items-end gap-2 border-t p-3"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <label htmlFor="chat-draft" className="sr-only">
          {placeholder}
        </label>
        <Textarea
          id="chat-draft"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="max-h-32 min-h-9 resize-none"
          onKeyDown={(e) => {
            // Enter envia; Shift+Enter quebra linha.
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          aria-describedby="chat-hint"
        />
        <Button
          type="submit"
          size="icon"
          disabled={disabled || !draft.trim()}
          aria-label="Enviar mensagem"
        >
          <SendHorizontal />
        </Button>
      </form>
      <p id="chat-hint" className="sr-only">
        Pressione Enter para enviar, Shift e Enter para quebrar linha.
      </p>
    </div>
  );
}
