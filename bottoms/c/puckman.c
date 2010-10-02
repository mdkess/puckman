#include <unistd.h>
#include <stdio.h>
#include <error.h>

#include "puckman.h"

int[] grid;
int width;

void init()
{
  setvbuf(stdout, NULL, _IONBF, 0);
  setvbuf(stdin, NULL, _IONBF, 0);
}

int read_world()
{
  int i = 0;
  int tries = 0;
  int r = scanf("%d", &width);
  if(r != 1)
    {
      error(1, 1, "Can't read width: %d\n", r);
      return -1;
    }

  for(i = 0; i < width; ++i)
    {
      tries = 0;
      r = 0;
      do
	{
	  r = read(0, &grid[i*width], width);
	}
      while(r < width && tries < 5);
      if(tries >= 5)
	{
	  error(1, 1, "Can't read grid.\n");
	  return -1;
	}
    }
}

void left()
{
  printf("L");
}

void right()
{
  printf("R");
}

void up()
{
  printf("U");
}

void down()
{
  printf("D");
}
