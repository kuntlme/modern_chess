"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { updateSettings } from "../action";

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  theme: z.enum(["dark", "light"]),
  autoQueen: z.boolean(),
});

export type SettingsFormValues = z.infer<typeof formSchema>;

export default function SettingsForm({ user }: { user: SettingsFormValues }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: user,
  });

  function onSubmit(values: SettingsFormValues) {
    startTransition(async () => {
      await updateSettings(values);
    });
  }

  const max = 5;
  const skipInterval = 1;
  const ticks = [...Array(max + 1).map((_, i) => i)];

  return (
    <div className="max-w-4xl space-y-8">
      <Tabs defaultValue="account">
        <TabsList className="mb-5">
          <TabsTrigger value="account">Profile</TabsTrigger>
          <TabsTrigger value="game">Game</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="account" className="space-y-5">
          {/* Username */}
          <FieldSet>
            <FieldGroup>
              {/* Name */}
              <Field>
                <div className="flex items-end justify-between">
                  <div className="flex w-4/5 flex-col justify-between space-y-2">
                    <FieldLabel>Name</FieldLabel>
                    <Input className="w-4/5" />
                  </div>
                  <Button variant="default">Change Name</Button>
                </div>
              </Field>

              {/* Bio */}
              <Field>
                <FieldLabel>Bio</FieldLabel>
                <Textarea className="w-4/5" />
                <div className="flex justify-end">
                  <Button variant="default" className="">
                    Change Name
                  </Button>
                </div>
              </Field>
            </FieldGroup>
            <FieldSeparator className="" />
            <FieldTitle className="text-lg font-bold">
              Account Security
            </FieldTitle>
            <FieldGroup>
              {/* Email */}
              <Field aria-disabled>
                <div className="flex items-end justify-between">
                  <div className="flex w-4/5 flex-col justify-between space-y-2">
                    <FieldLabel>Email</FieldLabel>
                    <Input className="w-4/5" />
                  </div>
                  <Button variant="default">Change Email</Button>
                </div>
              </Field>

              {/* Username */}
              <Field>
                <div className="flex items-end justify-between">
                  <div className="flex w-4/5 flex-col justify-between space-y-2">
                    <FieldLabel>Username</FieldLabel>
                    <Input className="w-4/5" />
                  </div>
                  <Button variant="default">Change Username</Button>
                </div>
              </Field>

              {/* Password */}
              <Field>
                <div className="flex items-end justify-between">
                  <div className="flex w-4/5 flex-col justify-between space-y-1">
                    <FieldLabel>Password</FieldLabel>
                    <FieldDescription>
                      Do not share password to anyone
                    </FieldDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger>
                      <Button variant="default">Change Password</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Password</DialogTitle>
                        <DialogDescription>
                          Please enter your current password to change your
                          password.
                        </DialogDescription>
                      </DialogHeader>
                      <FieldSet>
                        <FieldGroup>
                          <Field>
                            <FieldLabel>Your password</FieldLabel>
                            <Input placeholder="Current password" />
                          </Field>
                          <Field>
                            <FieldLabel>New password</FieldLabel>
                            <Input placeholder="Current password" />
                          </Field>
                          <Field>
                            <FieldLabel>Re-enter your new password</FieldLabel>
                            <Input placeholder="Current password" />
                          </Field>
                        </FieldGroup>
                      </FieldSet>
                      <DialogFooter>
                        <Button variant={"outline"}>Cancel</Button>

                        <Button variant={"default"}>Update</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </Field>
            </FieldGroup>
          </FieldSet>
        </TabsContent>

        {/* Game Tab */}
        <TabsContent value="game">
          <FieldSet>
            {/* Volume switcher */}
            <FieldLegend className="">Configure your game settings</FieldLegend>
            <FieldGroup className="w-4/5">
              <FieldLabel className="">
                <Field
                  orientation="horizontal"
                  className="flex justify-between"
                >
                  <div>
                    <FieldTitle>In-Game Audio</FieldTitle>
                    <FieldDescription>
                      Play sounds for moves and game events.Hear move sounds,
                      captures, checks, and endgame alerts.
                    </FieldDescription>
                  </div>
                  <div>
                    <FieldContent>
                      <Switch />
                    </FieldContent>
                  </div>
                </Field>
              </FieldLabel>

              {/* Volume range */}
              <Field>
                <FieldTitle>Sound Volume</FieldTitle>
                <FieldDescription>
                  Set the volume level for in-game audio effects.
                </FieldDescription>
                <FieldContent>
                  <div>
                    <Slider
                      aria-label="Slider with ticks"
                      defaultValue={[5]}
                      max={max}
                    />
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

              {/* TODO: Conditional rendering */}
              {/* TODO: ADD BOARD THEME */}
            </FieldGroup>
          </FieldSet>
        </TabsContent>

        {/* Piracy Tab */}
        <TabsContent value="privacy">
          <FieldLegend>Privacy & Account Visibility</FieldLegend>
          <FieldSet>
            {/* Online status switcher */}
            <FieldGroup className="w-full max-w-xl">
              <FieldLabel className="">
                <Field
                  className="flex justify-between"
                  orientation={"horizontal"}
                >
                  <div>
                    <FieldTitle>Online Status</FieldTitle>
                    <FieldDescription>
                      Allow other players to see when you are online.{" "}
                    </FieldDescription>
                  </div>
                  <div>
                    <FieldContent>
                      <Switch />
                    </FieldContent>
                  </div>
                </Field>
              </FieldLabel>

              {/* Friend Request */}
              <FieldLabel className="">
                <Field
                  className="flex justify-between"
                  orientation={"horizontal"}
                >
                  <div>
                    <FieldTitle>Friend Requests</FieldTitle>
                    <FieldDescription>
                      Allow other players to send you friend requests.{" "}
                    </FieldDescription>
                  </div>
                  <div>
                    <FieldContent>
                      <Switch />
                    </FieldContent>
                  </div>
                </Field>
              </FieldLabel>

              {/* Rating visibility */}
              <FieldLabel className="">
                <Field
                  className="flex justify-between"
                  orientation={"horizontal"}
                >
                  <div>
                    <FieldTitle>Rating Visibility</FieldTitle>
                    <FieldDescription>
                      Display your rating on your profile and in public
                      games.{" "}
                    </FieldDescription>
                  </div>
                  <div>
                    <FieldContent>
                      <Switch />
                    </FieldContent>
                  </div>
                </Field>
              </FieldLabel>

              {/* Public game history */}
              <FieldLabel className="">
                <Field
                  className="flex justify-between"
                  orientation={"horizontal"}
                >
                  <div>
                    <FieldTitle>Public Game History</FieldTitle>
                    <FieldDescription>
                      Allow other players to view your completed games.{" "}
                    </FieldDescription>
                  </div>
                  <div>
                    <FieldContent>
                      <Switch />
                    </FieldContent>
                  </div>
                </Field>
              </FieldLabel>
            </FieldGroup>
          </FieldSet>
        </TabsContent>
      </Tabs>
    </div>
  );
}
