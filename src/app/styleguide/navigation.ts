export interface NavItem {
  name: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

function group(title: string, items: [string, string][]): NavSection {
  return {
    title,
    items: items.map(([name, slug]) => ({
      name,
      href: `/styleguide/components/${slug}`,
    })),
  };
}

export const navigation: NavSection[] = [
  {
    title: "Foundation",
    items: [{ name: "Design Tokens", href: "/styleguide" }],
  },
  group("Chat", [
    ["Attachment", "attachment"],
    ["Bubble", "bubble"],
    ["Chat", "chat"],
    ["Marker", "marker"],
    ["Message", "message"],
    ["Message Scroller", "message-scroller"],
  ]),
  group("Formulários", [
    ["Button", "button"],
    ["Checkbox", "checkbox"],
    ["Combobox", "combobox"],
    ["Date Picker", "date-picker"],
    ["Field", "field"],
    ["Form", "form"],
    ["Input", "input"],
    ["Input OTP", "input-otp"],
    ["Label", "label"],
    ["Radio Group", "radio-group"],
    ["Select", "select"],
    ["Slider", "slider"],
    ["Switch", "switch"],
    ["Textarea", "textarea"],
    ["Toggle", "toggle"],
    ["Toggle Group", "toggle-group"],
  ]),
  group("Layout", [
    ["Accordion", "accordion"],
    ["Aspect Ratio", "aspect-ratio"],
    ["Card", "card"],
    ["Carousel", "carousel"],
    ["Collapsible", "collapsible"],
    ["Resizable", "resizable"],
    ["Scroll Area", "scroll-area"],
    ["Separator", "separator"],
    ["Sheet", "sheet"],
    ["Sidebar", "sidebar"],
    ["Skeleton", "skeleton"],
  ]),
  group("Navegação", [
    ["Breadcrumb", "breadcrumb"],
    ["Command", "command"],
    ["Context Menu", "context-menu"],
    ["Dropdown Menu", "dropdown-menu"],
    ["Menubar", "menubar"],
    ["Navigation Menu", "navigation-menu"],
    ["Pagination", "pagination"],
    ["Tabs", "tabs"],
  ]),
  group("Overlays", [
    ["Alert Dialog", "alert-dialog"],
    ["Dialog", "dialog"],
    ["Drawer", "drawer"],
    ["Hover Card", "hover-card"],
    ["Popover", "popover"],
    ["Tooltip", "tooltip"],
  ]),
  group("Feedback", [
    ["Alert", "alert"],
    ["Badge", "badge"],
    ["Progress", "progress"],
    ["Sonner", "sonner"],
    ["Toast", "toast"],
  ]),
  group("Dados", [
    ["Avatar", "avatar"],
    ["Calendar", "calendar"],
    ["Chart", "chart"],
    ["Data Table", "data-table"],
    ["Table", "table"],
    ["Typography", "typography"],
  ]),
];
