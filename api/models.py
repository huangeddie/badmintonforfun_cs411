from django.db import models

# Create your models here.

JOBS = (
        ('PRESIDENT', 'President'),
        ('TREASURER', 'Treasurer'),
        ('OFFICER', 'Officer'),
    )

QUEUE_TYPE = (
        ('CASUAL', 'Casual'),
        ('RANKED', 'Ranked'),
        ('KOTH', 'King of the Hill'),
    )

class Queue(models.Model):
    type = models.CharField(max_length=64, choices=QUEUE_TYPE, primary_key=True)

class Court(models.Model):
    id = models.AutoField(primary_key=True)
    number = models.IntegerField()
    queue = models.ForeignKey(Queue, on_delete=models.SET_NULL, null=True, blank=True)

class Tournament(models.Model):
    date = models.DateField('date of tournament', primary_key=True)

class Interested(models.Model):
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    formerBoardMember = models.BooleanField(default=False)
    email = models.EmailField(primary_key=True)

    def __str__(self):
        return '{} {}'.format(self.first_name, self.last_name)


class Member(Interested):
    level = models.IntegerField(default=0)
    private = models.BooleanField(default=False)
    dateJoined = models.DateField('date joined')
    queue = models.ForeignKey(Queue, on_delete=models.SET_NULL, null=True, blank=True)
    bio = models.CharField(max_length=500)

class BoardMember(Member):
    job = models.CharField(max_length=64, choices=JOBS)

class Election(models.Model):
    date = models.DateField('date of the election', primary_key=True)
    endDate = models.DateField('election end date', null=True, blank=True)

    def __str__(self):
        return '{} to {}'.format(self.date, self.endDate)

class Votes(models.Model):
    votee = models.ForeignKey(Member, related_name='votee', on_delete=models.SET_NULL, null=True)
    election = models.ForeignKey(Election, on_delete=models.CASCADE, primary_key=True)
    voter = models.ForeignKey(Member, related_name='voter', on_delete=models.CASCADE, unique=True)

class Campaign(models.Model):
    job = models.CharField(max_length=64, choices=JOBS)
    pitch = models.CharField(max_length=500)
    election = models.ForeignKey(Election, on_delete=models.CASCADE)
    campaigner = models.ForeignKey(Member, on_delete=models.CASCADE)

class Team(models.Model):
    class Meta:
        unique_together = (('member1', 'member2'),)
    member1 = models.ForeignKey(Member, related_name='member1', on_delete=models.PROTECT)
    member2 = models.ForeignKey(Member, related_name='member2', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return '{} & {}'.format(self.member1, self.member2)

class Match(models.Model):
    id = models.AutoField(primary_key=True)
    startDate = models.DateTimeField('date started')
    scoreA = models.IntegerField()
    scoreB = models.IntegerField()
    teamA = models.ForeignKey(Team, related_name='teamA', on_delete=models.SET_NULL, null=True)
    teamB = models.ForeignKey(Team, related_name='teamB', on_delete=models.SET_NULL, null=True)
    court = models.ForeignKey(Court, on_delete=models.SET_NULL, null=True, blank=True)
    tournament = models.ForeignKey(Tournament, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return '{} vs {}'.format(self.teamA, self.teamB)

class FinishedMatch(Match):
    endDate = models.DateTimeField('date ended')

class Announcement(models.Model):
    date = models.DateTimeField('date of announcement', primary_key=True)
    title = models.CharField(max_length=64)
    entry = models.CharField(max_length=500)

    def __str__(self):
        return '{}'.format(self.title)

class Schedule(models.Model):
    date = models.DateField('date of session', primary_key=True)
    number_of_courts = models.IntegerField(default=4)

    def __str__(self):
        return '{}'.format(self.date)