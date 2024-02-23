# Vue-Vite Starter XL

## Context

This ready-to-go Vue-Vite starter kit is tailored for dashboard-style layouts, perfectly aligning with our platform's shared design patterns. It's specifically crafted for building single-page applications (SPAs) that are primarily JavaScript-driven, enabling the creation of highly interactive features.

SPAs excel in scenarios requiring advanced interactivity, such as dashboards. For content-driven pages with predominantly static content, we opt for faster rendering systems primarily utilizing pure HTML. However, for the rich interactivity seen in dashboards, this starter kit is our go-to.

### Features Included 🚀

- **Layout System** 📐: Comes with headers, footers, and a side menu, all customizable to fit our needs.
- **Language Selection** 🌐: Integrated with our proprietary translation system, featuring two languages set up by default.
- **Dark/Light Mode Toggle** 🌓: Easily switch between dark and light visual appearances.
- **Styling with Tailwind CSS** 💅: Utilize Tailwind CSS for rapid UI development.
- **Vue Router for Routing** 🚦: Facilitates building SPAs with dynamic page navigation.
- **TypeScript** 📝: Ensures type safety across our project, enhancing code quality and maintainability.
- **Vite** ⚡: Enjoy a fast development server and build tool optimized for modern web projects.
- **Cache Setup** 💾: Choose between localStorage or sessionStorage for caching needs.
- **Pinia** 💾: Using vue/pinia as a layer for memory storage ad also as the api layer for accessing the caches.
- **Obfuscation** 🔒: Implements storage encryption (primarily to hinder reverse engineering, as the key resides in the frontend).
- **Advanced Configurations** ⚙️: Supports loading of complex configurations for greater flexibility.
- **API Connection Setup** 🌍: Prepared for integration with our APIs using the standard ABY style SDKs.

This starter kit is engineered to kickstart our dashboard project with efficiency and style, encapsulating best practices and modern development tools.

## Prerequisites: 
- Base-environment: Nodejs amd npm needs to be installed on the dev machine.

Furthermore, `pnpm` package manager needs to be installed on the machine.
```bash
# Install pnpm package manager
npm install -g pnpm
```

We further more need `mkcert` installed don the machine (mac only)

Run the following from a global terminal instance:
```bash
brew install mkcert
```

Now, we can initiate the locaL git clone
```bash
# Install all package dependencies
pnpm i
```

```bash
# Create local certs: will simulate a https environment
pnpm cert
```

```bash
# Launch dev server
pnpm dev
```

## Layout system
We have two main layouts that we wrap the content inside.
 - A Navbar
 - Navbar with a sidemeny (dashboard styie)

Both have a footer at the bottom.m nThe content alligns in the middle.

### Navbar features
This features a nav-bar on top, and a footer on bottom.

The navbar includes to interactive elements as default:
- A dark/light theme switch
- A language selector

It is possible to add other link elements with manual customization.

### Left menu features
This features an additional left menu with navigation items.
There is a `brand` field on top.

When using the left-menu layout this occupies the full vertical space. The `navbar` width gets adjusted correspondingly.

Customization is required:
- Of the `brand` icon and the name
- Of the route names and the router links.

### Apply layouts
To apply the layouts, we use the router, and designate the `layout` component as a wrapper arund the content.
This is configured in the vue-router specific for that page group.
Here is a code example:

```ts
/** dashboard base layout  with lang select and dark mode switch */
const DashBoardLayout = () => import('/@/layouts/dashboard/DashBoardLayout.vue')

export const dashboard = {
  path: '/dashboard', // "dashboard" if using locale prefixer
  component: DashBoardLayout, // <= this designates the layout cmponent as a wrapper for all pages in this group
  redirect: { path: paths.PlaceHolder1 },
  name: 'dashboard',
  children: [
    {
      path: paths.PlaceHolder1,
      name: paths.PlaceHolder1,
      props: true,
      meta: {
        requiresAuth: import.meta.env.VITE_ROUTE_GUARD === 'true', // <= true in production
        title: 'navbar.content.page1.header',
        description: 'navbar.content.page1.description',
      },
      component: componentMap.PlaceHolder1, // <= this component is now wrapped in the dashboard layout
    },
  ]
}
```

## Localization system
The template includes a localization system to change languages. It is custom made, as most library based translation options included dynamic functions which doesnt pass our security posture.

The template includes three languages and some minimal text flor each. This is mostly as a proof of concept, and will need customization.

### Using the localization

We can access the translator in each module by importing the `useAbyI18n` function, and then accessing the `t` function.

For any text we want to translate, we then write a string argument as a json dot notation, for example "navlink.profile" will access the translated text of the "navlink" file, and the key "profile". 

Its reactive, so when users change the language, the text updates without refreshing the page.

```ts
import { useRouter } from 'vue-router'
import { useAbyI18n } from '/@/locales/useAbyI18n'

const { t } = useAbyI18n('aby')

const translated = ref(t(`navlink.profile`))
```

### Advanced translation features
The translaton mechanism is primarily a basic string substittuion. Most transaltions are also quite basic. However, we ave gtwo fetaures to spice it up a lttle:
- Variable substitution, and
- Multistring paragraphs

**Variable substitution**
Let's consider a practical scenario. Assume we have a translation key that includes placeholders for variables that should be dynamically replaced at runtime. For instance, a greeting message that includes the user's name and the current date.

Suppose our translation files look something like this:

```json
// welcome.json (located in our 'en' language pack)
{
  "greeting": "Hello, {name}! Today is {date}."
}
```

To use variable substitution with the useAbyI18n/t function and the translate method we provided, we would pass in the key of the translation string we want to use (e.g., "greeting") along with an options object that contains the values for each placeholder in the translation string.

```ts
// Assuming we have functions to get the user's name and the current date
const userName = 'John Doe'
const currentDate = new Date().toLocaleDateString()

// Using the translation function `t` with variable substitution
const greetingMessage = t('greeting', { name: userName, date: currentDate })
```

**Multistring paragraphs**
The useAbyI18n translation system offers a sophisticated feature for handling multi-string paragraph entries, which is especially useful for displaying text that spans multiple paragraphs or sections with clear visual separation. This functionality is designed to enhance the readability of longer text blocks in our application by inserting double line breaks between distinct segments or paragraphs. Here's how it works and how we can utilize it in our applications

Handling Multi-String Paragraph Entries
When our translation entries consist of arrays with string elements, each element is intended to represent a separate paragraph or section. The translation system automatically detects these arrays and concatenates their elements into a single string, inserting a double line break (\n\n) between each element. This results in a visually separated text block that preserves the paragraph structure defined in our translation files.

```json
// welcome.json (located in our 'en' language pack)
{
  "welcomeMessage": [
    "Welcome to our application!",
    "Our application is designed to help you manage our tasks efficiently.",
    "Get started by creating our first task today."
  ]
}
```

To use this multi-string paragraph entry in our application, simply refer to the translation key as we normally would. The translation system takes care of the rest:

```ts
// Retrieve the multi-string paragraph entry
const welcomeMessage = t('welcome.welcomeMessage')
```

### Configuring and Adding Languages
Creating a well-structured translation system involves organizing language packs within specific directories and utilizing JSON files for actual translations. This setup enables the seamless integration of multiple languages and simplifies the process of accessing and managing translation strings within our Vue.js application.

#### Directory Structure

The initial step is to create a locales directory within the src folder of our project. Each language has its own subdirectory within locales, named using the standard locale notation (e.g., en for English, fr for French, no for Norwegian). Within each language's subdirectory, JSON files are used to store translation strings:

```sh
    project-root/
    │
    ├── src/
    │   ├── locales/               # Localization code
    │   │   ├── en/                # English language pack
    │   │   │   ├── common.json    # Common strings (e.g., buttons, labels)
    │   │   │   ├── homepage.json  # Translations for the homepage
    │   │   ├── fr/                # French language pack
    │   │   │   ├── common.json    # Common strings (in French)
    │   │   │   ├── homepage.json  # Homepage translations (in French)
    │   │   ├── no/                # Norwegian language pack
    │   │       ├── common.json    # Common strings (in Norwegian)
    │   │       ├── homepage.json  # Homepage translations (in Norwegian)

```

#### Accessing Translations

Translations are accessed using dot notation, where the first part of the notation corresponds to the filename (excluding the .json extension), and subsequent parts navigate through the JSON object structure:
Accessing elements in this file with `welcome.home` or `welcome.nested.settings`

```json
// welcome.json (located in our 'en' language pack)
{
  "home": "Home",
  "dashboard": "Dashboard",
  "profile": "Profile",

  // we can also nest values
  "nested": {
    "settings": "Settings",
    "messages": "Messages",
    "logout": "Logout"
  }
}
```

#### Organizing Translation Files

It's advisable to organize translation files around content themes or related features. For instance, if we have a set of pages or components that share common functionality or are grouped together in Vue Router, it would be practical to store their translations in a dedicated file. This approach not only keeps our translations manageable but also mirrors the structure of our application, making it easier to maintain and update:

#### Code Technicals for Adding Languages
When expanding your application to include additional languages, there are specific areas in the codebase that require updates to ensure seamless integration of the new locales. Here's a concise guide on where and how to make these changes:

1. locales/init/constants

This file plays a crucial role in defining the locales available within your application. To incorporate a new language, you must manually add the locale strings to three constants within this file. These constants are utilized throughout the application to manage language selection and display translations correctly. The process involves:

Adding the new locale identifier (e.g., fr for French) to the list of supported locales.
Ensuring that the locale details are correctly entered, including any specific formatting or display names required by the application.

2. locales/lang/index.ts

This file is responsible for mapping the language groups to their corresponding directory strings within your project. The necessity to edit this file directly might seem a bit cumbersome, but it's essential due to the specifics of the build system in use. To add a new language, you will:

Introduce a new language group entry that specifies the directory path for the newly added language pack.
Ensure that the directory string matches the structure within the locales folder and corresponds to the new language's standard notation.
Future Considerations

Looking ahead, there's potential for the translation files to be decoupled from the direct codebase, allowing for dynamic fetching from a remote server. This change aims to streamline the process of updating and adding translations without needing to adjust the application's code directly. We plan to provide a utility function to facilitate this transition, making it easier to manage translations dynamically during development and in production environments.