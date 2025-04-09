# TGG Dialog

A React-based dialog system for FiveM, with backward compatibility for bl_dialog.

## Features

- React/TypeScript UI interface
- Typewriter text effect
- Multiple dialog options
- Custom button actions
- Transition effects
- Camera focus on NPCs
- Backward compatibility with bl_dialog exports

## Usage

```lua
exports['tgg-dialog']:showDialog({
    ped = ped,
    dialog = {
        {
            id = 'initial_fisherman_talk',
            job = 'Fisher Man',
            name = 'Robert',
            text = 'Give me fish then ill let you go',
            buttons = {
                {
                    id = 'leave1',
                    label = 'Don\'t give him fish',
                    nextDialog = 'fisherman_second', -- switch to second dialog
                    onSelect = function(switchDialog)
                        -- you can make ped hit you bcs you didnt give him fish?
                    end
                },
                {
                    id = 'leave1',
                    label = 'Give him fish',
                    nextDialog = 'fisherman_talk_end', -- switch to third dialog
                },
            },
        },
        {
            id = 'fisherman_second',
            job = 'Fisher Man',
            name = 'Robert',
            text = 'You cant run from me, im catching you!',
            buttons = {
                {
                    id = 'leave2',
                    label = 'Ok, ill give you',
                    nextDialog = 'initial_fish_talk',
                },
            },
        },
        {
            id = 'fisherman_talk_end',
            job = 'Fisher Man',
            name = 'Robert',
            text = 'Robert is happy now!',
            buttons = {
                {
                    id = 'end',
                    label = 'End conversation', --end conversation
                    close = true,
                },
            },
        },
    }
})
```

## Backward Compatibility

This resource is a drop-in replacement for bl_dialog. If you're currently using bl_dialog, you can replace it with tgg-dialog without changing any of your code. All exports from bl_dialog are supported.

### UI

The UI is built with React and TypeScript. To develop the UI:

1. Navigate to the `web` directory
2. Run `npm install`
3. Run `npm run dev`
4. In the fxmanifest.lua, uncomment the `ui_page 'http://localhost:3000/'` line and comment out the `ui_page 'build/index.html'` line
5. Restart the resource

### Building

To build the UI for production:

1. Navigate to the `web` directory
2. Run `npm run build`
3. Make sure the `ui_page 'build/index.html'` line is uncommented in fxmanifest.lua
4. Restart the resource

## Customizing Theme

To customize the appearance of the dialog system, you can modify the CSS variables in the `web/src/app.css` file. The theme colors are defined at the top of this file in the `:root` selector:

```css
:root {
  --primary-color: #00959a;
  --primary-color-dark: #007a7f;
  --primary-color-light: #33aeb3;
  --background-color: rgba(0, 0, 0, 0.45);
  --background-hover-color: rgba(0, 0, 0, 0.55);
  --text-primary-color: rgba(255, 255, 255, 0.95);
  --text-secondary-color: #00959a;
  --border-opacity: 0.7;
  --background-opacity: 0.25;
  --shadow-color: rgba(0, 149, 154, 0.25);
  --shadow-light-color: rgba(0, 149, 154, 0.15);
  --button-bg-color: rgba(0, 149, 154, 0.25);
  --gradient-dark: rgba(0, 0, 0, 0.5);
  --gradient-mid: rgba(0, 0, 0, 0.15);
  --gradient-transparent: transparent;
  --white: #FFFFFF;
  --white-opacity-95: rgba(255, 255, 255, 0.95);
  --border-light-color: rgba(255, 255, 255, 0.04);
  
  /* Additional CSS properties... */
}
```

### Theme Properties

| Property | Description | Default Value |
|----------|-------------|---------------|
| --primary-color | Primary accent color | #00959a |
| --primary-color-dark | Darker variant of primary | #007a7f |
| --primary-color-light | Lighter variant of primary | #33aeb3 |
| --background-color | Dialog background | rgba(0, 0, 0, 0.45) |
| --background-hover-color | Dialog background on hover | rgba(0, 0, 0, 0.55) |
| --text-primary-color | Main text color | rgba(255, 255, 255, 0.95) |
| --text-secondary-color | Secondary text color (job title) | #00959a |
| --border-opacity | Opacity for borders | 0.7 |
| --background-opacity | Opacity for backgrounds | 0.25 |
| --shadow-color | Color for shadow effects | rgba(0, 149, 154, 0.25) |
| --shadow-light-color | Lighter shadow color | rgba(0, 149, 154, 0.15) |
| --button-bg-color | Button background color | rgba(0, 149, 154, 0.25) |
| --gradient-dark | Dark gradient color | rgba(0, 0, 0, 0.5) |
| --gradient-mid | Medium gradient color | rgba(0, 0, 0, 0.15) |
| --gradient-transparent | Transparent gradient color | transparent |
| --white | Pure white color | #FFFFFF |
| --white-opacity-95 | White with opacity | rgba(255, 255, 255, 0.95) |
| --border-light-color | Light border color | rgba(255, 255, 255, 0.04) |

To customize the theme:

1. Navigate to the `web/src/app.css` file
2. Modify the CSS variables under the `:root` selector to your desired colors
3. Rebuild the UI by running `npm run build` in the `web` directory
4. Restart your resource

## Credits

This project is based on work originally created by Byte Labs Project. The original codebase has been modified and enhanced while maintaining the MIT license terms.

Original Copyright © 2023 Byte Labs Project

[Original product](https://github.com/Byte-Labs-Studio/bl_dialog)
