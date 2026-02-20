import { getUserData } from "@/feature/dashboard/settings/action";
import SettingsForm, {
  SettingsFormValues,
} from "@/feature/dashboard/settings/components/settings-form";

const SettingsPage = async () => {
  const userData = (await getUserData()) as SettingsFormValues;
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-foreground text-3xl font-bold">Settings</h1>
      <p className="text-muted-foreground mb-8">
        Manage your account setting and preferences.
      </p>

      <SettingsForm user={userData} />
    </div>
  );
};

export default SettingsPage;
