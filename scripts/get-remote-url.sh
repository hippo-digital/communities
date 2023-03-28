#!/bin/bash

REMOTE_URL=$(git remote get-url origin)
echo -n $REMOTE_URL;
