#!/bin/bash

# Переменная, содержащая слово для поиска и замены
SEARCH=Door_left
REPLACE=Door_left

# Найти все файлы с расширением .prefab и выполнить замену
for file in *.prefab; do
    if [ -f "$file" ]; then
        sed -i "s/$SEARCH/$REPLACE/g" "$file"
        echo "Замена в файле $file завершена"
    fi
done