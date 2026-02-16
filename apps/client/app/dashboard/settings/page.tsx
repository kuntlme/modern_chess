"use client";
import React, { useState } from "react";

import {
  Bell,
  Camera,
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  Globe,
  HelpCircle,
  Key,
  Languages,
  Lock,
  LogOut,
  Mail,
  Monitor,
  Moon,
  Palette,
  Save,
  Settings,
  Shield,
  Smartphone,
  Sun,
  Trash2,
  User,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    // Profile
    username: "Player1",
    email: "player1@chess.com",
    displayName: "Chess Master",
    bio: "Passionate chess player since 2018",
    country: "us",

    // Notifications
    emailNotifications: true,
    gameInvites: true,
    friendRequests: true,
    tournamentAlerts: true,
    moveReminders: false,
    marketingEmails: false,

    // Game Settings
    autoQueen: true,
    showLegalMoves: true,
    confirmMoves: false,
    soundEnabled: true,
    soundVolume: 70,
    animationSpeed: "normal",
    boardTheme: "classic",
    pieceStyle: "neo",

    // Appearance
    theme: "dark",
    language: "en",
    timezone: "UTC",

    // Privacy
    showOnlineStatus: true,
    allowFriendRequests: true,
    showRating: true,
    showGameHistory: true,
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const SettingSection = ({
    title,
    description,
    children,
  }: {
    title: string;
    description?: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {description && <p className="text-sm text-slate-400">{description}</p>}
      </div>
      {children}
    </div>
  );

  const SettingRow = ({
    icon: Icon,
    label,
    description,
    children,
    danger = false,
  }: {
    icon: React.ElementType;
    label: string;
    description?: string;
    children: React.ReactNode;
    danger?: boolean;
  }) => (
    <div className="flex items-center justify-between rounded-xl bg-slate-700/30 p-4 transition-colors hover:bg-slate-700/50">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "rounded-lg p-2.5",
            danger ? "bg-red-500/20" : "bg-slate-600/50"
          )}
        >
          <Icon
            className={cn("size-5", danger ? "text-red-400" : "text-slate-300")}
          />
        </div>
        <div>
          <p
            className={cn(
              "font-medium",
              danger ? "text-red-400" : "text-white"
            )}
          >
            {label}
          </p>
          {description && (
            <p className="text-sm text-slate-400">{description}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );

  return (
    <div className="flex w-full flex-col items-center gap-8 py-4">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-full max-w-5xl items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-4 shadow-lg shadow-amber-500/20">
            <Settings className="size-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-slate-400">
              Manage your account and preferences
            </p>
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 text-white shadow-lg shadow-amber-500/20 transition-all hover:shadow-xl hover:shadow-amber-500/30"
        >
          {isSaving ? (
            <div className="size-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <>
              <Save className="mr-2 size-5" />
              Save Changes
            </>
          )}
        </Button>
      </motion.div>

      {/* Settings Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-5xl"
      >
        <TabsList className="mb-6 grid h-auto w-full grid-cols-5 gap-2 border border-slate-700 bg-slate-800/50 p-2">
          {[
            { id: "profile", label: "Profile", icon: User },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "game", label: "Game", icon: Zap },
            { id: "appearance", label: "Appearance", icon: Palette },
            { id: "privacy", label: "Privacy", icon: Lock },
          ].map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center gap-2 rounded-lg py-3 data-[state=active]:bg-slate-700 data-[state=active]:text-white"
            >
              <tab.icon className="size-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Profile Picture */}
            <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl">
              <CardContent className="p-6">
                <SettingSection
                  title="Profile Picture"
                  description="Choose a profile picture"
                >
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="flex size-24 items-center justify-center bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/20">
                        <User className="size-12 text-white" />
                      </Avatar>
                      <button className="absolute -right-1 -bottom-1 rounded-full bg-slate-700 p-2 shadow-lg transition-colors hover:bg-slate-600">
                        <Camera className="size-4 text-white" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="border-slate-600 bg-slate-700/50 text-white hover:bg-slate-700"
                      >
                        Upload Photo
                      </Button>
                      <p className="text-xs text-slate-400">
                        JPG, PNG or GIF. Max size 2MB.
                      </p>
                    </div>
                  </div>
                </SettingSection>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl">
              <CardContent className="space-y-6 p-6">
                <SettingSection
                  title="Account Information"
                  description="Update your personal details"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300">Username</Label>
                      <Input
                        value={settings.username}
                        onChange={(e) =>
                          setSettings({ ...settings, username: e.target.value })
                        }
                        className="border-slate-600 bg-slate-700/50 text-white placeholder:text-slate-400 focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Display Name</Label>
                      <Input
                        value={settings.displayName}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            displayName: e.target.value,
                          })
                        }
                        className="border-slate-600 bg-slate-700/50 text-white placeholder:text-slate-400 focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Email</Label>
                      <Input
                        type="email"
                        value={settings.email}
                        onChange={(e) =>
                          setSettings({ ...settings, email: e.target.value })
                        }
                        className="border-slate-600 bg-slate-700/50 text-white placeholder:text-slate-400 focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Country</Label>
                      <Select
                        value={settings.country}
                        onValueChange={(value) =>
                          setSettings({ ...settings, country: value })
                        }
                      >
                        <SelectTrigger className="border-slate-600 bg-slate-700/50 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="border-slate-700 bg-slate-800">
                          <SelectItem value="us">🇺🇸 United States</SelectItem>
                          <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                          <SelectItem value="de">🇩🇪 Germany</SelectItem>
                          <SelectItem value="fr">🇫🇷 France</SelectItem>
                          <SelectItem value="in">🇮🇳 India</SelectItem>
                          <SelectItem value="ru">🇷🇺 Russia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Bio</Label>
                    <textarea
                      value={settings.bio}
                      onChange={(e) =>
                        setSettings({ ...settings, bio: e.target.value })
                      }
                      rows={3}
                      className="w-full rounded-md border border-slate-600 bg-slate-700/50 p-3 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </SettingSection>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl">
              <CardContent className="space-y-4 p-6">
                <SettingSection
                  title="Security"
                  description="Manage your password and security"
                >
                  <div className="space-y-4">
                    <SettingRow
                      icon={Key}
                      label="Change Password"
                      description="Update your account password"
                    >
                      <Button
                        variant="outline"
                        className="border-slate-600 bg-slate-700/50 text-white hover:bg-slate-700"
                      >
                        Update
                        <ChevronRight className="ml-1 size-4" />
                      </Button>
                    </SettingRow>

                    <SettingRow
                      icon={Shield}
                      label="Two-Factor Authentication"
                      description="Add an extra layer of security"
                    >
                      <Switch />
                    </SettingRow>

                    <SettingRow
                      icon={Smartphone}
                      label="Connected Devices"
                      description="2 devices connected"
                    >
                      <Button
                        variant="outline"
                        className="border-slate-600 bg-slate-700/50 text-white hover:bg-slate-700"
                      >
                        Manage
                        <ChevronRight className="ml-1 size-4" />
                      </Button>
                    </SettingRow>
                  </div>
                </SettingSection>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border border-red-500/30 bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl">
              <CardContent className="space-y-4 p-6">
                <SettingSection
                  title="Danger Zone"
                  description="Irreversible actions"
                >
                  <SettingRow
                    icon={Trash2}
                    label="Delete Account"
                    description="Permanently delete your account and all data"
                    danger
                  >
                    <Button
                      variant="outline"
                      className="border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                    >
                      Delete Account
                    </Button>
                  </SettingRow>
                </SettingSection>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl">
              <CardContent className="space-y-6 p-6">
                <SettingSection
                  title="Notification Preferences"
                  description="Choose what notifications you receive"
                >
                  <div className="space-y-4">
                    <SettingRow
                      icon={Mail}
                      label="Email Notifications"
                      description="Receive notifications via email"
                    >
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            emailNotifications: checked,
                          })
                        }
                      />
                    </SettingRow>

                    <SettingRow
                      icon={Zap}
                      label="Game Invites"
                      description="Get notified when someone invites you to a game"
                    >
                      <Switch
                        checked={settings.gameInvites}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, gameInvites: checked })
                        }
                      />
                    </SettingRow>

                    <SettingRow
                      icon={User}
                      label="Friend Requests"
                      description="Notifications for new friend requests"
                    >
                      <Switch
                        checked={settings.friendRequests}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, friendRequests: checked })
                        }
                      />
                    </SettingRow>

                    <SettingRow
                      icon={Bell}
                      label="Tournament Alerts"
                      description="Get notified about upcoming tournaments"
                    >
                      <Switch
                        checked={settings.tournamentAlerts}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            tournamentAlerts: checked,
                          })
                        }
                      />
                    </SettingRow>

                    <SettingRow
                      icon={HelpCircle}
                      label="Move Reminders"
                      description="Remind me when it's my turn"
                    >
                      <Switch
                        checked={settings.moveReminders}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, moveReminders: checked })
                        }
                      />
                    </SettingRow>

                    <Separator className="bg-slate-700" />

                    <SettingRow
                      icon={Globe}
                      label="Marketing Emails"
                      description="Receive promotional content and updates"
                    >
                      <Switch
                        checked={settings.marketingEmails}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, marketingEmails: checked })
                        }
                      />
                    </SettingRow>
                  </div>
                </SettingSection>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Game Tab */}
        <TabsContent value="game">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl">
              <CardContent className="space-y-6 p-6">
                <SettingSection
                  title="Gameplay Settings"
                  description="Customize your game experience"
                >
                  <div className="space-y-4">
                    <SettingRow
                      icon={Zap}
                      label="Auto-Queen"
                      description="Automatically promote pawns to queen"
                    >
                      <Switch
                        checked={settings.autoQueen}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, autoQueen: checked })
                        }
                      />
                    </SettingRow>

                    <SettingRow
                      icon={Eye}
                      label="Show Legal Moves"
                      description="Highlight available moves when selecting a piece"
                    >
                      <Switch
                        checked={settings.showLegalMoves}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, showLegalMoves: checked })
                        }
                      />
                    </SettingRow>

                    <SettingRow
                      icon={Check}
                      label="Confirm Moves"
                      description="Require confirmation before making a move"
                    >
                      <Switch
                        checked={settings.confirmMoves}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, confirmMoves: checked })
                        }
                      />
                    </SettingRow>
                  </div>
                </SettingSection>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl">
              <CardContent className="space-y-6 p-6">
                <SettingSection
                  title="Sound & Animation"
                  description="Audio and visual preferences"
                >
                  <div className="space-y-4">
                    <SettingRow
                      icon={settings.soundEnabled ? Volume2 : VolumeX}
                      label="Sound Effects"
                      description="Play sounds for moves and game events"
                    >
                      <Switch
                        checked={settings.soundEnabled}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, soundEnabled: checked })
                        }
                      />
                    </SettingRow>

                    {settings.soundEnabled && (
                      <div className="rounded-xl bg-slate-700/30 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="rounded-lg bg-slate-600/50 p-2.5">
                              <Volume2 className="size-5 text-slate-300" />
                            </div>
                            <div>
                              <p className="font-medium text-white">Volume</p>
                              <p className="text-sm text-slate-400">
                                {settings.soundVolume}%
                              </p>
                            </div>
                          </div>
                          <div className="w-48">
                            <Slider
                              value={[settings.soundVolume]}
                              onValueChange={(value) =>
                                setSettings({
                                  ...settings,
                                  soundVolume: value[0],
                                })
                              }
                              max={100}
                              step={1}
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="rounded-xl bg-slate-700/30 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="rounded-lg bg-slate-600/50 p-2.5">
                            <Zap className="size-5 text-slate-300" />
                          </div>
                          <div>
                            <p className="font-medium text-white">
                              Animation Speed
                            </p>
                            <p className="text-sm text-slate-400">
                              Piece movement animation
                            </p>
                          </div>
                        </div>
                        <Select
                          value={settings.animationSpeed}
                          onValueChange={(value) =>
                            setSettings({ ...settings, animationSpeed: value })
                          }
                        >
                          <SelectTrigger className="w-32 border-slate-600 bg-slate-700/50 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="border-slate-700 bg-slate-800">
                            <SelectItem value="slow">Slow</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="fast">Fast</SelectItem>
                            <SelectItem value="instant">Instant</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </SettingSection>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl">
              <CardContent className="space-y-6 p-6">
                <SettingSection
                  title="Board Customization"
                  description="Choose your board and pieces"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300">Board Theme</Label>
                      <Select
                        value={settings.boardTheme}
                        onValueChange={(value) =>
                          setSettings({ ...settings, boardTheme: value })
                        }
                      >
                        <SelectTrigger className="border-slate-600 bg-slate-700/50 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="border-slate-700 bg-slate-800">
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="wood">Wood</SelectItem>
                          <SelectItem value="marble">Marble</SelectItem>
                          <SelectItem value="neon">Neon</SelectItem>
                          <SelectItem value="tournament">Tournament</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Piece Style</Label>
                      <Select
                        value={settings.pieceStyle}
                        onValueChange={(value) =>
                          setSettings({ ...settings, pieceStyle: value })
                        }
                      >
                        <SelectTrigger className="border-slate-600 bg-slate-700/50 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="border-slate-700 bg-slate-800">
                          <SelectItem value="neo">Neo</SelectItem>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="staunton">Staunton</SelectItem>
                          <SelectItem value="alpha">Alpha</SelectItem>
                          <SelectItem value="maestro">Maestro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </SettingSection>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl">
              <CardContent className="space-y-6 p-6">
                <SettingSection
                  title="Theme & Display"
                  description="Customize the app appearance"
                >
                  <div className="space-y-6">
                    {/* Theme Selection */}
                    <div className="space-y-3">
                      <Label className="text-slate-300">Theme</Label>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          {
                            id: "light",
                            label: "Light",
                            icon: Sun,
                            gradient: "from-amber-100 to-orange-100",
                          },
                          {
                            id: "dark",
                            label: "Dark",
                            icon: Moon,
                            gradient: "from-slate-700 to-slate-900",
                          },
                          {
                            id: "system",
                            label: "System",
                            icon: Monitor,
                            gradient: "from-slate-500 to-slate-700",
                          },
                        ].map((theme) => (
                          <button
                            key={theme.id}
                            onClick={() =>
                              setSettings({ ...settings, theme: theme.id })
                            }
                            className={cn(
                              "group relative flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all",
                              settings.theme === theme.id
                                ? "border-indigo-500 bg-indigo-500/10"
                                : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                            )}
                          >
                            <div
                              className={cn(
                                "flex size-12 items-center justify-center rounded-full bg-gradient-to-br shadow-lg",
                                theme.gradient
                              )}
                            >
                              <theme.icon
                                className={cn(
                                  "size-6",
                                  theme.id === "light"
                                    ? "text-amber-600"
                                    : "text-white"
                                )}
                              />
                            </div>
                            <span className="font-medium text-white">
                              {theme.label}
                            </span>
                            {settings.theme === theme.id && (
                              <div className="absolute top-2 right-2 rounded-full bg-indigo-500 p-1">
                                <Check className="size-3 text-white" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-slate-700" />

                    {/* Language & Region */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-300">Language</Label>
                        <Select
                          value={settings.language}
                          onValueChange={(value) =>
                            setSettings({ ...settings, language: value })
                          }
                        >
                          <SelectTrigger className="border-slate-600 bg-slate-700/50 text-white">
                            <Languages className="mr-2 size-4" />
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="border-slate-700 bg-slate-800">
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                            <SelectItem value="ru">Русский</SelectItem>
                            <SelectItem value="zh">中文</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300">Timezone</Label>
                        <Select
                          value={settings.timezone}
                          onValueChange={(value) =>
                            setSettings({ ...settings, timezone: value })
                          }
                        >
                          <SelectTrigger className="border-slate-600 bg-slate-700/50 text-white">
                            <Globe className="mr-2 size-4" />
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="border-slate-700 bg-slate-800">
                            <SelectItem value="UTC">UTC</SelectItem>
                            <SelectItem value="EST">Eastern Time</SelectItem>
                            <SelectItem value="PST">Pacific Time</SelectItem>
                            <SelectItem value="CET">
                              Central European
                            </SelectItem>
                            <SelectItem value="IST">India Standard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </SettingSection>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl">
              <CardContent className="space-y-6 p-6">
                <SettingSection
                  title="Privacy Settings"
                  description="Control who can see your information"
                >
                  <div className="space-y-4">
                    <SettingRow
                      icon={Eye}
                      label="Show Online Status"
                      description="Let others see when you're online"
                    >
                      <Switch
                        checked={settings.showOnlineStatus}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            showOnlineStatus: checked,
                          })
                        }
                      />
                    </SettingRow>

                    <SettingRow
                      icon={User}
                      label="Allow Friend Requests"
                      description="Receive friend requests from other players"
                    >
                      <Switch
                        checked={settings.allowFriendRequests}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            allowFriendRequests: checked,
                          })
                        }
                      />
                    </SettingRow>

                    <SettingRow
                      icon={Shield}
                      label="Show Rating"
                      description="Display your rating on your profile"
                    >
                      <Switch
                        checked={settings.showRating}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, showRating: checked })
                        }
                      />
                    </SettingRow>

                    <SettingRow
                      icon={Globe}
                      label="Public Game History"
                      description="Allow others to view your game history"
                    >
                      <Switch
                        checked={settings.showGameHistory}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, showGameHistory: checked })
                        }
                      />
                    </SettingRow>
                  </div>
                </SettingSection>

                <Separator className="bg-slate-700" />

                <SettingSection
                  title="Data & Downloads"
                  description="Manage your data"
                >
                  <div className="space-y-4">
                    <SettingRow
                      icon={Eye}
                      label="Download My Data"
                      description="Get a copy of all your data"
                    >
                      <Button
                        variant="outline"
                        className="border-slate-600 bg-slate-700/50 text-white hover:bg-slate-700"
                      >
                        Request
                        <ChevronRight className="ml-1 size-4" />
                      </Button>
                    </SettingRow>

                    <SettingRow
                      icon={LogOut}
                      label="Sign Out Everywhere"
                      description="Log out of all devices"
                    >
                      <Button
                        variant="outline"
                        className="border-orange-500/50 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 hover:text-orange-300"
                      >
                        Sign Out All
                      </Button>
                    </SettingRow>
                  </div>
                </SettingSection>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
