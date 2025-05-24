import { Switch } from "antd";
import BulbOutlined from "@ant-design/icons/lib/icons/BulbOutlined";
import BulbFilled from "@ant-design/icons/lib/icons/BulbFilled";
import { useTheme } from "@/core/hooks";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Switch
      checked={isDarkMode}
      onChange={toggleTheme}
      checkedChildren={<BulbFilled className="text-yellow-300" />}
      unCheckedChildren={<BulbOutlined />}
      className={`${isDarkMode ? "!bg-primary" : ""} w-12`}
    />
  );
}

