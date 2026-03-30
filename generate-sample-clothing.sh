#!/bin/bash

mkdir -p public/clothing/hats public/clothing/shirts public/clothing/pants public/clothing/accessories

# Generate a baseball cap
echo "Generating baseball cap..."
curl -s https://api.openai.com/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "dall-e-3",
    "prompt": "A simple red baseball cap viewed from above, PNG transparent background, simple flat design, clipart style",
    "n": 1,
    "size": "1024x1024",
    "quality": "standard"
  }' | python3 -c "
import sys, json, urllib.request
data = json.load(sys.stdin)
if 'data' in data:
    url = data['data'][0]['url']
    print(f'Downloading: {url}')
    urllib.request.urlretrieve(url, 'public/clothing/hats/baseball.png')
    print('✓ Baseball cap saved')
"

sleep 3

# Generate a t-shirt
echo "Generating t-shirt..."
curl -s https://api.openai.com/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "dall-e-3",
    "prompt": "A simple blue t-shirt laid flat, PNG transparent background, simple flat design, clipart style",
    "n": 1,
    "size": "1024x1024",
    "quality": "standard"
  }' | python3 -c "
import sys, json, urllib.request
data = json.load(sys.stdin)
if 'data' in data:
    url = data['data'][0]['url']
    print(f'Downloading: {url}')
    urllib.request.urlretrieve(url, 'public/clothing/shirts/tshirt.png')
    print('✓ T-shirt saved')
"

echo "✓ Sample clothing items generated!"
