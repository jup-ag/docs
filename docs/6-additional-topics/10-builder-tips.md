---
sidebar_label: "General Builder Tips"
description: General builder tips on Solana
---
# General Builder Tips on Solana

**New to building on Solana?**

This is a good resource: https://solanacookbook.com

**Private Key, beware of compromising your wallet.**

A wallet Private Key is the most important strings of text, that allows anyone to restore/access your wallet, make sure you never commit your **Private Key** into your version control (*Git, etc.*), or expose them anywhere.

The safer way would be the use of `.env` file in your projects, and adding a `.gitignore` entry. Managing secrets can feel like extra work, but necessary.

Our example repos are all equipped with `.env` support by default, if you want to configure it yourself: [dotenv](https://github.com/motdotla/dotenv#readme), [react-native-dotenv](https://github.com/goatandsheep/react-native-dotenv).

**Careful! Before executing this function block!**

Swaps are irreversible! Make sure you are certain with your code, and be extra careful if you happen to run intervals, or any code without human supervision.
