"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";

// Assuming sonner is used for toasts, standard in modern shadcn setups

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { updateSettings } from "../action";

const formSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .optional()
    .or(z.literal("")),
  name: z.string().optional().or(z.literal("")),
  bio: z.string().optional().or(z.literal("")),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  theme: z.enum(["dark", "light"]).optional(),
  autoQueen: z.boolean().optional(),
  showLegalMoves: z.boolean().optional(),
  inGameAudio: z.boolean().optional(),
  soundVolume: z.number().min(0).max(5).optional(),
  showOnlineStatus: z.boolean().optional(),
  allowFriendRequests: z.boolean().optional(),
  showRating: z.boolean().optional(),
  publicGameHistory: z.boolean().optional(),
});

export type SettingsFormValues = z.infer<typeof formSchema>;

export default function SettingsForm({ user }: { user: SettingsFormValues }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username || "",
      name: user.name || "",
      bio: user.bio || "",
      email: user.email || "",
      theme: user.theme ?? "light",
      autoQueen: user.autoQueen ?? false,
      showLegalMoves: user.showLegalMoves ?? false,
      inGameAudio: user.inGameAudio ?? true,
      soundVolume: user.soundVolume ?? 5,
      showOnlineStatus: user.showOnlineStatus ?? true,
      allowFriendRequests: user.allowFriendRequests ?? true,
      showRating: user.showRating ?? true,
      publicGameHistory: user.publicGameHistory ?? true,
    },
  });

  function onSubmit(values: SettingsFormValues) {
    startTransition(async () => {
      try {
        const res = await updateSettings(values);
        if (res?.success) {
          toast.success("Settings updated successfully");
        } else {
          toast.error("Failed to update settings");
        }
      } catch (error) {
        toast.error("An error occurred");
      }
    });
  }

  const max = 5;
  const skipInterval = 1;
  const ticks = [...Array(max + 1).map((_, i) => i)];

  return (
    <div className="max-w-4xl space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="account">
            <TabsList className="mb-5">
              <TabsTrigger value="account">Profile</TabsTrigger>
              <TabsTrigger value="game">Game</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="account" className="space-y-5">
              <FieldSet>
                <FieldGroup>
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <Field>
                        <div className="flex w-4/5 flex-col justify-between space-y-2">
                          <FieldLabel>Name</FieldLabel>
                          <FormControl>
                            <Input placeholder="Your display name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </Field>
                    )}
                  />

                  {/* Bio */}
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <Field>
                        <div className="flex w-4/5 flex-col justify-between space-y-2">
                          <FieldLabel>Bio</FieldLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about yourself"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </Field>
                    )}
                  />
                </FieldGroup>
                <FieldSeparator className="" />
                <FieldTitle className="text-lg font-bold">
                  Account Security
                </FieldTitle>
                <FieldGroup>
                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <Field>
                        <div className="flex w-4/5 flex-col justify-between space-y-2">
                          <FieldLabel>Email</FieldLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Your email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </Field>
                    )}
                  />

                  {/* Username */}
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <Field>
                        <div className="flex w-4/5 flex-col justify-between space-y-2">
                          <FieldLabel>Username</FieldLabel>
                          <FormControl>
                            <Input placeholder="Your username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </Field>
                    )}
                  />
                </FieldGroup>
              </FieldSet>
            </TabsContent>

            {/* Game Tab */}
            <TabsContent value="game">
              <FieldSet>
                <FieldLegend>Configure your game settings</FieldLegend>
                <FieldGroup className="w-4/5">
                  <FormField
                    control={form.control}
                    name="inGameAudio"
                    render={({ field }) => (
                      <FieldLabel className="">
                        <Field
                          orientation="horizontal"
                          className="flex justify-between"
                        >
                          <div>
                            <FieldTitle>In-Game Audio</FieldTitle>
                            <FieldDescription>
                              Play sounds for moves and game events.
                            </FieldDescription>
                          </div>
                          <div>
                            <FieldContent>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FieldContent>
                          </div>
                        </Field>
                      </FieldLabel>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="soundVolume"
                    render={({ field }) => (
                      <Field>
                        <FieldTitle>Sound Volume</FieldTitle>
                        <FieldDescription>
                          Set the volume level for in-game audio effects.
                        </FieldDescription>
                        <FieldContent>
                          <div>
                            <FormControl>
                              <Slider
                                disabled={!form.watch("inGameAudio")}
                                defaultValue={[field.value || 5]}
                                max={max}
                                step={1}
                                onValueChange={(vals) =>
                                  field.onChange(vals[0])
                                }
                              />
                            </FormControl>
                            <span
                              aria-hidden="true"
                              className="text-muted-foreground mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium"
                            >
                              {ticks.map((_, i) => (
                                <span
                                  className="flex w-0 flex-col items-center justify-center gap-2"
                                  key={String(i)}
                                >
                                  <span
                                    className={cn(
                                      "bg-muted-foreground/70 h-1 w-px",
                                      i % skipInterval !== 0 && "h-0.5"
                                    )}
                                  />
                                  <span
                                    className={cn(
                                      i % skipInterval !== 0 && "opacity-0"
                                    )}
                                  >
                                    {i}
                                  </span>
                                </span>
                              ))}
                            </span>
                          </div>
                        </FieldContent>
                      </Field>
                    )}
                  />
                </FieldGroup>
              </FieldSet>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy">
              <FieldLegend>Privacy & Account Visibility</FieldLegend>
              <FieldSet>
                <FieldGroup className="w-full max-w-xl">
                  {/* Online status switcher */}
                  <FormField
                    control={form.control}
                    name="showOnlineStatus"
                    render={({ field }) => (
                      <FieldLabel className="">
                        <Field
                          className="flex justify-between"
                          orientation="horizontal"
                        >
                          <div>
                            <FieldTitle>Online Status</FieldTitle>
                            <FieldDescription>
                              Allow other players to see when you are online.
                            </FieldDescription>
                          </div>
                          <div>
                            <FieldContent>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FieldContent>
                          </div>
                        </Field>
                      </FieldLabel>
                    )}
                  />

                  {/* Friend Request */}
                  <FormField
                    control={form.control}
                    name="allowFriendRequests"
                    render={({ field }) => (
                      <FieldLabel className="">
                        <Field
                          className="flex justify-between"
                          orientation="horizontal"
                        >
                          <div>
                            <FieldTitle>Friend Requests</FieldTitle>
                            <FieldDescription>
                              Allow other players to send you friend requests.
                            </FieldDescription>
                          </div>
                          <div>
                            <FieldContent>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FieldContent>
                          </div>
                        </Field>
                      </FieldLabel>
                    )}
                  />

                  {/* Rating visibility */}
                  <FormField
                    control={form.control}
                    name="showRating"
                    render={({ field }) => (
                      <FieldLabel className="">
                        <Field
                          className="flex justify-between"
                          orientation="horizontal"
                        >
                          <div>
                            <FieldTitle>Rating Visibility</FieldTitle>
                            <FieldDescription>
                              Display your rating on your profile and in public
                              games.
                            </FieldDescription>
                          </div>
                          <div>
                            <FieldContent>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FieldContent>
                          </div>
                        </Field>
                      </FieldLabel>
                    )}
                  />

                  {/* Public game history */}
                  <FormField
                    control={form.control}
                    name="publicGameHistory"
                    render={({ field }) => (
                      <FieldLabel className="">
                        <Field
                          className="flex justify-between"
                          orientation="horizontal"
                        >
                          <div>
                            <FieldTitle>Public Game History</FieldTitle>
                            <FieldDescription>
                              Allow other players to view your completed games.
                            </FieldDescription>
                          </div>
                          <div>
                            <FieldContent>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FieldContent>
                          </div>
                        </Field>
                      </FieldLabel>
                    )}
                  />
                </FieldGroup>
              </FieldSet>
            </TabsContent>
          </Tabs>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Settings"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
