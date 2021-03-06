#ifndef __PUCKMAN_H__
#define __PUCKMAN_H__

#define EMPTY  ' '
#define WALL   '+'
#define PILL   'O'
#define DOT    '.'
#define GHOST  '&'
#define SELF   'C'
#define SSELF  '@'
#define PUCK   'P'
#define SPUCK  'S'

#define SCORE_DOT       1
#define SCORE_PILL      2
#define SCORE_PUCK      4
#define SCORE_SPUCK     6
#define SCORE_LASTMAN   5

#define BOUNDS(x,min,max) ((x >= min) && (x < max)) ? x 
#define IN_BOUNDS(x,y) check_in_bounds(x,y)
#define CELL(x,y) access_cell(x,y)
#define AM_SUPER (CELL(pos_x,pos_y) == SSELF)
#define IS_SUPER (CELL(epos_x,epos_y) == SPUCK)

extern int width;
extern char* grid;
extern int pos_x;
extern int pos_y;
extern int epos_x;
extern int epos_y;

void init();
int read_world();
void left();
void right();
void up();
void down();
char access_cell(int x , int y);

#endif
