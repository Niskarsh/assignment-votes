
select qv.skill_id, array_agg(jsonb_build_object('sv_entity_id', qv.sv_entity_id, 'voted_as', qv.voted_as)) from question_vote qv 

where qv.question_id='f0ecc799-a1fc-48b0-963b-2000afcd260d' and qv.voted_as !='PENDING'
group by qv.skill_id