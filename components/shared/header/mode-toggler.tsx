"use client"
import React from 'react'
import {  useTheme } from 'next-themes'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
  } from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { Moon, Sun, SunMoon } from 'lucide-react';

import { useState, useEffect } from 'react'


export default function ModeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme();

    // to avoid hydration
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null;
  return (
    <DropdownMenu>
        {/* trigger */}
        <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='focus-visible:ring-0 focus-visible:ring-offset-0'>
                {
                    theme === 'system' ? (
                        <SunMoon/>
                    ) : theme === 'dark' ? (
                        <Moon/>
                    ) : (
                        <Sun/>
                    )
                }
            </Button>
        </DropdownMenuTrigger>

        {/* menu content */}
        <DropdownMenuContent>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuCheckboxItem 
                checked={theme === 'system'} 
                onClick={() => setTheme('system')}
            >
                System
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem 
                checked={theme === 'dark'} 
                onClick={() => setTheme('dark')}
            >
                dark
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem 
                checked={theme === 'light'} 
                onClick={() => setTheme('light')}
            >
                light
            </DropdownMenuCheckboxItem>
        </DropdownMenuContent>

    </DropdownMenu>
  )
}


