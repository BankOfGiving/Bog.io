module.exports = function () {
    var AddAuditEntry = function (event, action, actor) {
        var self = this;
        var id = event._id;

        var audit = new Audit({
            entityType: 'Event',
            entityId: id,
            action: action,
            actor: actor
        });

        self.findById(id, function (err, auditEvent) {
            console.log('AUDIT EVENT:  ' + auditEvent);
            if (auditEvent.audit == null) {
                auditEvent.audit = {
                    author: actor,
                    createdAt: Date.now(),
                    detail: []
                };
            } else {
                if (auditEvent.audit.author == null) {
                    auditEvent.audit.author = actor;
                }
                if (auditEvent.audit.createdAt == null) {
                    auditEvent.audit.createdAt = Date.now();
                }
            }
            auditEvent.audit.lastModifiedAt = Date.now();
            auditEvent.audit.detail.push(audit);

            auditEvent.save(function (err) {
                if (err) console.log('AUDIT SAVE ERROR:' + err);

                return true;
            });
        });
    };

    return {
        add: AddAuditEntry
    }
};