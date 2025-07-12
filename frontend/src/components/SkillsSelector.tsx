import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const skillOptions = [
    { id: 1, name: "Photoshop" },
    { id: 2, name: "Excel" },
    { id: 3, name: "Web Design" },
    { id: 4, name: "Python Programming" },
    { id: 5, name: "Video Editing" },
    { id: 6, name: "Photography" },
    { id: 7, name: "Public Speaking" },
];

type SkillSelectorProps = {
    title: string;
    selected: number[]; // store selected skill IDs
    setSelected: (ids: number[]) => void;
    skills_offered: number[];
    skills_wanted: number[];
};

export const SkillSelector = ({
    title,
    selected,
    setSelected,
    skills_offered,
    skills_wanted,
}: SkillSelectorProps) => {
    const allDisabledIds = Array.from(
        new Set([...skills_offered, ...skills_wanted])
    );

    const toggleSkill = (id: number) => {
        if (selected.includes(id)) {
            setSelected(selected.filter((s) => s !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    const removeSkill = (id: number) => {
        setSelected(selected.filter((s) => s !== id));
    };

    const selectedSkills = skillOptions.filter((s) => selected.includes(s.id));

    return (
        <div className="space-y-2">
            <label className="text-muted-foreground text-sm">Skills {title}</label>

            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full flex flex-wrap gap-1 justify-start min-h-[40px] px-2 py-1"
                        )}
                    >
                        {selectedSkills.length > 0 ? (
                            selectedSkills.map((skill) => (
                                <span
                                    key={skill.id}
                                    className="flex items-center gap-1 bg-muted text-foreground text-sm rounded-full px-2 py-0.5"
                                >
                                    {skill.name}
                                    <X
                                        size={12}
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeSkill(skill.id);
                                        }}
                                    />
                                </span>
                            ))
                        ) : (
                            <span className="text-muted-foreground text-sm">
                                Select skills
                            </span>
                        )}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandGroup>
                            {skillOptions.map((skill) => {
                                const isDisabled =
                                    allDisabledIds.includes(skill.id) &&
                                    !selected.includes(skill.id);
                                const isSelected = selected.includes(skill.id);

                                return (
                                    <CommandItem
                                        key={skill.id}
                                        onSelect={() => !isDisabled && toggleSkill(skill.id)}
                                        disabled={isDisabled}
                                        className={cn(
                                            "cursor-pointer",
                                            isDisabled && "opacity-40 cursor-not-allowed"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-muted",
                                                isSelected
                                                    ? "bg-primary text-primary-foreground"
                                                    : "opacity-50"
                                            )}
                                        >
                                            {isSelected && <Check className="h-4 w-4" />}
                                        </div>
                                        {skill.name}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};
